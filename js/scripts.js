

var lastPlayedChord = [];
var lastPlayedOct = [];

function makeNoise(notes, octave){
    let piano = document.getElementById("piano-viz");

    for (let i = 0; i < notes.length; i++) {
        notes[i] += 24;
    }

    for(let j = 0; j < 8; j++) {
        for(let i = 0; i < 12; i++) {
            if(lastPlayedChord[i] != undefined) piano.setNoteUp(lastPlayedChord[i], lastPlayedOct[i]);
        }
    }
    lastPlayedChord = [];
    lastPlayedOct = [];


    for(var i = 0; i < notes.length; i++){
        Synth.setSampleRate(44100); // sets sample rate to 20000Hz
        Synth.setVolume(0.1337); // even better.
        

        let note = Tonal.Midi.midiToNoteName(notes[i], { pitchClass: true, sharps: true });
        let actualOctave = parseInt(Math.floor(notes[i] / 12)) + parseInt(octave - 2);
        Synth.play("piano", note, actualOctave, 1);
        piano.setNoteDown(note, actualOctave);
        lastPlayedChord[i] = note;
        lastPlayedOct[i] = actualOctave;
    }
}


//update values in labels
function updateLabelValues(){
    var nodes = document.getElementById('parameters').childNodes;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'label' && nodes[i].htmlFor != 'autoposition' &&  nodes[i].htmlFor != 'dictionary') {
            if(nodes[i].htmlFor == 'key' ){
                nodes[i].innerText =  "Root: " + Tonal.Midi.midiToNoteName(Number(document.getElementById(nodes[i].htmlFor).value) + 11,  { pitchClass: true, sharps: true });
            }
            else{
                nodes[i].innerText = capitalizeFirstLetter(nodes[i].htmlFor) + ": " + document.getElementById(nodes[i].htmlFor).value;
            }
        }
    }
    setMaxForGradeMode(getDictionaryLenght());
    compute();
}

function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}


function setMajor(){
    document.getElementById('dictionary').value = '';
    document.getElementById('dictionary').value = '0 2 4 5 7 9 11';
    updateLabelValues();
}
function setHarmMajor(){
    document.getElementById('dictionary').value = '';
    document.getElementById('dictionary').value = '0 2 4 5 7 8 11';
    updateLabelValues();
}
function setMelMinor(){
    document.getElementById('dictionary').value = '';
    document.getElementById('dictionary').value = '0 2 3 5 7 9 11';
    updateLabelValues();
}
function setHarmMinor(){
    document.getElementById('dictionary').value = '';
    document.getElementById('dictionary').value = '0 2 3 5 7 8 11';
    updateLabelValues();
}
function setMinorPentatonic(){
    document.getElementById('dictionary').value = '';
    document.getElementById('dictionary').value = '0 3 5 7 10';
    updateLabelValues();
}
function setHexatonic(){
    document.getElementById('dictionary').value = '';
    document.getElementById('dictionary').value = '0 2 4 6 8 10';
    updateLabelValues();
}
function setOctatonic(){
    document.getElementById('dictionary').value = '';
    document.getElementById('dictionary').value = '0 2 3 5 6 8 9 11';
    updateLabelValues();
}

function setMaxForGradeMode(length){
    document.getElementById('grade').setAttribute("max", length);
    document.getElementById('mode').setAttribute("max", length);
    return;
}

function getDictionaryLenght(){
    let scaleStr = document.getElementById('dictionary').value;
    let scale = scaleStr.split(" ");
    return scale.length + 1;
}

function compute(){
    var nodes = document.getElementById('parameters').childNodes;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'input') {
            if(nodes[i].id == 'dictionary') dictionary = nodes[i].value.split(' ');
            if(nodes[i].id == 'grade') grade = nodes[i].value -1;
            if(nodes[i].id == 'interval') interval = nodes[i].value - 1;
            if(nodes[i].id == 'voices') voices = nodes[i].value;
            if(nodes[i].id == 'position') position = Number(nodes[i].value);
            if(nodes[i].id == 'octave') octave = Number(nodes[i].value) + 3;
            if(nodes[i].id == 'key') key = nodes[i].value - 1;
            if(nodes[i].id == 'mode') mode = nodes[i].value - 1;
            if(nodes[i].id == 'autoposition') isAutoVoicing = nodes[i].checked;
        }
    }
    var result = go(dictionary, mode, grade, voices, interval, position, isAutoVoicing).slice();
    makeNoise(result, octave);
    document.getElementById('resultValue').innerText = result;
    document.getElementById('resultName').innerText = String(String(Tonal.Chord.detect(result.map(Tonal.Note.fromMidi))[0]).replace('M', '')).replace('ma7', 'maj7');
    let noteNames = [];
    for(let i = 0; i < result.length; i++){
        noteNames[i]  = Tonal.Midi.midiToNoteName(result[i],  { pitchClass: true, sharps: true });
    }
    document.getElementById('resultNoteNames').innerText = String(noteNames).replaceAll(",", " ");
}



var out = [0,0,0];

function go(scala, modo, grado, voci, intervallo, rivoltoV, isAutoVoicing){
    
    var oldVoicing = out;

    out = rotate(dictionary, modo);
    out = formaPrimaria(out);
    out = rivolto(out, grado);
    out = rotate(out, grado);
    out = intervalli(out, voci, intervallo);
    
    if(isAutoVoicing && voci > 2){
        out = autoVoicing(oldVoicing, out); 
    }

    out = rivolto(out, rivoltoV);
    out = arrayRotate(out, rivoltoV);
    out = sortUp(out);
    out = addKey(out, key);
    
    oldVoicing = out;
    
    return out;
}

//----------------------------//

function addKey(array, key){
for(let i = 0; i < array.length; i++){
    array[i] = array[i] + key;
}
return array;
}


//----------------------------//

function sortUp(numArray){
numArray.sort(function(a, b) {
return a - b;
});
return numArray;
}


function rivolto(s, n){

var lenLista = s.length;
var quoziente = ~~(n / lenLista);
var resto = Math.abs(n % lenLista);
var dodici = [];

for(var i = 0; i < lenLista; i++){
dodici.push(12*quoziente);
}

if(n >= 0){	
    for(var i = 0; i < lenLista; i++){
        if(i < resto){
            dodici[i] = dodici[i] + 12;	
        }
    }
}
    
if(n < 0){
    for(var i = 0; i < lenLista; i++){
        if(i < resto){
            dodici[i] = dodici[i] - 12;
        }
    }
dodici = dodici.reverse()	
}

for(var i = 0; i < lenLista; i++){
    dodici[i] = dodici[i] + s[i];
}

//dodici = arrayRotate(dodici, n);

return(dodici);
}

//----------------------------//

function arrayRotate(arr, count) {
const len = arr.length
arr.push(...arr.splice(0, (-count % len + len) % len))
return arr
}

function rotate(s, times){
var newArray = s.slice();

while(times < 0){		
    times = times + s.length;
}
    
while(times--){		
    var temp = newArray.shift();
    newArray.push(temp)
}
return newArray;
}

//----------------------------//

function formaPrimaria(s){

var newScala = s.slice();
var newArray = [];

for(var i = 0; i < s.length; i++){
    newArray.push(newScala[i] - newScala[0])
}

for(var i = 0; i < s.length; i++){
    while(newArray[i] < 0){			
            newArray[i] = newArray[i] + 12;
            }		
        }

return newArray;
}

//----------------------------//

function intervalli(s, n, dist){

var newArray = [];

for(var i = 0; i < n; i++){
        newArray[i] = s[(i*dist)%s.length] + (12 * (~~((i*dist) / s.length)));
}


return newArray;
        
}

//----------------------------//

const euclideanDistance = (a, b) =>
Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));

function autoVoicing(oldVoicing, atm) {
let possibleVoicing = [];
for (let i = 0; i <= 6; i++) {
    let nuovoVoicing = rivolto(atm, i - 3);
    nuovoVoicing = arrayRotate(nuovoVoicing, i - 3);
    nuovoVoicing = sortUp(nuovoVoicing);
    possibleVoicing.push(nuovoVoicing);
}

let minLength = Math.min(oldVoicing.length, atm.length);

let newVoicing = possibleVoicing.reduce((prev, curr) =>
    oldVoicing.slice(0, minLength).reduce((acc, val, i) => acc + (val - curr[i]) ** 2, 0) <
    oldVoicing.slice(0, minLength).reduce((acc, val, i) => acc + (val - prev[i]) ** 2, 0) ? curr : prev);

return newVoicing;
}

//INIT
updateLabelValues();
var nodes = document.getElementById('parameters').childNodes;
for(var i=0; i<nodes.length; i++) {
if (nodes[i].nodeName.toLowerCase() == 'input' || 'checkbox') {
    nodes[i].addEventListener("change", updateLabelValues);
}
}

