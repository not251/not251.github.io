# [not251.github.io](not251.github.io)

# Towards a new formal language

The theoretical assumptions of our research come from a profound study of traditional harmony theory, compositional and performance practices, modal theory, and the more recent pitch-class set theory. Through the tools of algebra and their computer implementations, our attempt is to formulate and propose a formal music language that transcends cultural aspects, allowing for the creation, communication and observation of musical phenomena in a compact, comprehensive, parametric way. 
The possible applications of this kind of language are multiple:
- creative/compositional;
- educational;
- therapeutic;
- research.

# Division of the Octave

In the 12-TET equal temperament used in Western music, we divide the octave into 12 equidistant semitones, which express the minimum possible distance between two adjacent sounds. In other systems, this number may vary and non-equidistant values may be selected. In the algorithm, all manipulations that involve an octave shift imply a progressive addition or subtraction of this parameter.

# Scale
In the Western system, a scale is a (ascending or descending) succession of sounds that proceed by adjacent degrees, or by intervals of a second and with adjacent names. In our algorithm, the scale is an array of integers containing the distances between the degrees and the generating sound (fundamental), expressed in semitones. 

> <p>Major scale:</p> <p> 0 2 4 5 7 9 11 </p>

It is also possible to express scales through the distances between one degree and another. 

> <p>Major scale:</p> <p>2 2 1 2 2 2 1 </p>

# Mode

The term 'mode' is used to represent a rotation of the intervals in the scale vector.

> <p>Major scale: 2 2 1 2 2 2 1 </p> <p>I mode: 2 2 1 2 2 2 1 </p> <p>II mode: 2 1 2 2 2 1 2 </p> <p>III mode: 1 2 2 2 1 2 2 </p> <p>IV mode: 2 2 2 1 2 2 1 </p> <p>V mode: 2 2 1 2 2 1 2 </p> <p>VI mode: 2 1 2 2 1 2 2 </p> <p>VII mode: 1 2 2 1 2 2 2 </p>

In our algorithm, since the scale vector expresses the distances from the fundamental, to obtain the modes we perform a translation to 0 of the rotated vector, subtracting from all the elements the value of the first. 

> <p>Major scale: 0 2 4 5 7 9 11 </p> <p> I mode: 0 2 4 5 7 9 11 </p> <p> II mode (not translated): 2 4 5 7 9 11 12 </p> <p> II mode (translated): 0 2 3 5 7 9 10 </p> 

# Degree

To select a degree on which to generate a voicing, the algorithm performs a further rotation of the mode vector (without translation to 0), obtaining an array of which the chosen degree is the first element. 

> <p> Major scale: 0 2 4 5 7 9 11 </p> <p> I mode: 0 2 4 5 7 9 11 </p> <p> II degree: 2 4 5 7 9 11 12 </p>

# Voices

Number of voices in a voicing. In traditional Western harmony practice, except for doublings, more than 4 real voices in a voicing are quite rare.

# Interval

In traditional theory, the interval between two sounds can be expressed in semitones or with ordinal numbers, evaluating the distance between the names of the notes (counting the extremes). 

> <p> C - D (ascending): 2 semitones; interval of a second. <p> </p> D - C (ascending): 10 semitones; interval of a seventh. </p>

In our algorithm, the interval expresses the distance between two or more sounds measured in elements of the degree vector. 

> <p> Major scale, I mode, I degree: 0 2 4 5 7 9 11 </p> <p> Number of voices: 3 </p> <p> Interval: 3 </p> <p> Voicing: 0 4 7 </p>

In Western music theory the mostly used interval is the third.
Modifying the interval variable for all voices or, by making it a vector, for individual voices, allows for the generation and more accurate representation of more complex harmonies. 

> <p> Major scale, I mode, I degree: 0 2 4 5 7 9 11 </p> <p> Number of voices: 3 </p> <p> Interval: 4 </p> <p> Voicing: 0 5 11 </p> <p> Number of voices: 4 </p> <p> Intervals: 3 4 9 </p> <p> Voicing: 0 4 5 12 </p>

# Position

To modify the position of the generated voicing, the algorithm performs a rotation. 

> <p>Major chord: 0 4 7 </p> <p> Position 0: 0 4 7 (fundamental position) </p> <p> Position 1: 4 7 12 (first inversion) </p> <p> Position 2: 7 12 14 (second inversion) </p> <p> Position -1: -5 0 4 (second inversion, lower octave) </p>

The term 'voice leading' refers to the path of individual voices in the movement from one voicing to the next. 
The algorithm performs a comparison between the last executed voicing and various possible positions of the next in terms of Euclidean distance between two points, returning the voicing that requires the least movement. 

>  <p>Previous voicing: 0 4 7 </p> <p> Next voicing: 7 11 14 </p> <p> Position 0: 7 11 14 </p> <p> Position 1: 11 14 19 </p> <p> Position -1: 2 7 11 </p> <p> Position 2: 14 19 23 </p> <p> Position – 2: -1 2 7 </p> <p> Least distant voicing: -1 2 7 </p>

This behavior, typical of choral, keyboard, and orchestral harmonic practice, can be modified to obtain a less parsimonious voice leading containing larger leaps, or disabled to obtain parallel harmonic motion.

# Bibliography

- ALBINI, G. (2021). Perché le note sono sette: Una storia dei fondamenti della musica tra matematica e percezione (Fuori dal coro) eBook. Editore: Algama.
- ARBONÉS, J., MILRUD, P. (2011). L’armonia è questione di numeri: musica e matematica. Milano: RBA Italia.
- ASSAYAG, G., FEICTINGER, H. G., , RODRIGUES, J.F. (2002). Mathematics and music: a Diderot mathematical forum. Berlin: Springer.
- BENSON, D.J. (2007). Music: a mathematical offering (3rd print., 2008). Cambridge: Cambridge University Press.
- BOEBINGER, D., NORMAN-HAIGNERE, S. V., MCDERMOTT, J. H., KANWISHER, N. (2021). Music-selective neural populations arise without musical training. Journal of neurophysiology, 125(6), 2237–2263.
- BRENT, J., BARKLEY, S. (2011). Modalogy: scales, modes , chords: the primordial building blocks of Music. Hal Leonard Corporation.
- BURNHAM, B. R., LONG, E., ZEIDE, J. (2021). Pitch direction on the perception of major and minor modes. Attention, perception , psychophysics, 83(1), 399–414.
- CAIMMI, R., FRANZON, A., TOGNON, S. (2017). Intervalli musicali nella scala temperata a 12 note: interpretazione geometrica. Canterano (RM): Aracne.
- CALLENDER, C. (2004). Continuous transformations. Music Theory Online, 10(3), 3.
- CALLENDER, C. (2007). Continuous harmonic spaces. Journal of Music Theory, 51(2), 277-332.
- CALLENDER, C., QUINN, I., TYMOCZKO, D. (2008). Generalized voice-leading spaces. Science, 320(5874), 346-348.
- CAMIZ, P., GIANSANTI, A. (2019). Fantalezioni di musimatefisica: un approccio musicale alle scienze esatte. Milano: Tab.
- COHN, R. (1991). Properties and generability of transpositionally invariant sets. Journal of Music Theory, 35(1/2), 1-32.
- COHN, R. (1997). Neo-riemannian operations, parsimonious trichords, and their" tonnetz" representations. Journal of Music Theory, 41(1), 1-66.
- COHN, R. (1998). Introduction to neo-riemannian theory: a survey and a historical perspective. Journal of Music Theory, 167-180.
- DOUTHETT, J., STEINBACH, P. (1998). Parsimonious graphs: A study in parsimony, contextual transformations, and modes of limited transposition. Journal of Music Theory, 241-263.
- DOUTHETT, J., HYDE, M. M., SMITH, C. J. (2008). Music Theory and Mathematics: Chords, Collections, and Transformations (NED-New edition). Boydell , Brewer.
- EMMER, M. (2012). Imagine Math: between culture and mathematics. Milano: Springer.
- EMMER, M. (2013). Imagine Math 2: between culture and mathematics. Milano: Springer.
- EMMER, M., ABATE, M., VILLARREAL, M. (2015). Imagine Math 4: between culture and mathematics. Milano: Springer.
- FAUVEL J., FLOOD, R., WILSON, R.J. (2003). Music and mathematics: from Pythagoras to fractals. Oxford: Oxford University Press.
- FORTE, A. (1973). The structure of atonal music. Yale University Press.
- GARLAND T.H., KAHN, C.V. (1995). Math and music: harmonious connections. Paolo Alto, CA: Dale Seymour.
- HALL, R. W., TYMOCZKO, D. (2007, July). Poverty and polyphony: A connection between economics and music. In Bridges Donostia: Mathematics, Music, Art, Architecture, Culture (pp. 259-268).
- HOFFMAN, J. (2008). On pitch-class set cartography: Relations between voice-leading spaces and Fourier spaces. Journal of Music Theory, 52(2), 219-249. 
- HARKLEROAD, L. (2006). The math behind the music. New York: Cambridge University Press.
- HURON, D. (1989). Voice Denumerability in Polyphonic Music of Homogeneous Timbres. Music Perception: An Interdisciplinary Journal, 6(4), 361–382.
- HURON, DAVID. (2006). Sweet Anticipation: Music and the Psychology of Expectation. Cambridge, Massachusetts: The MIT Press.
- ILLIANO, R., LOCANTO, M. (2019). Twentieth-century music and mathematics. Turnhout: Brepols.
- JEDRZEJEWSKI, F. (2006). Mathematical theory of music. Sampzon : Delatour France; Paris: IrcamCentre Pompidou.
- JACOBY, N. , TISHBY, N., TYMOCZKO, D. (2015). An Information Theoretic Approach to Chord Categorization and Functional Harmony. Journal of New Music Research. 44. 219-244.
- JOHNSON, T.A. (2008). Foundations of diatonic theory: a mathematically based approach to music fundamentals. Lanham, Md.: Scarecrow Press.
- KIRCHER, A. (1650). Musurgia universalis sive Ars magna consoni et dissoni. Italia: (n.p.).
- KUNG, D. (2013). How music and mathematics relate: course guidebook. Chantilly, Vi.: Great courses.
- LEVY, E. (1985). A Theory of Harmony. State University of New York Press.
- LEWIN, D. (1959). Re: Intervallic relations between two collections of notes. Journal of Music Theory, 3(2), 298-301.
- LEWIN, D. (2001). Special cases of the interval function between pitch-class sets X and Y. Journal of Music Theory, 45(1), 1-29.
- LEWIN, D. (2011). Generalized musical intervals and transformations. Oxford: Oxford University Press.
- LOY, G. (2011). Musimathics: the mathematical foundations of music. Cambridge, Mass.; London: MIT Press.
- MAOR, E. (2018). La musica dai numeri: musica e matematica, da Pitagora a Schoenberg. Torino: Codice.
- MAZZOLA G., MANNONE, M., PANG, Y. (2016). Cool math for hot music: a first introduction to mathematics for music theorists. Cham: Springer.
- MAZZOLA, G. (1985). Gruppen und Kategorien in der Musik: Entwurf einer mathematischen Musiktheorie. Berlin: Heldermann.
- MAZZOLA, G. (2017). The topos of music (2nd ed.). Cham: Springer.
- MICALLEF GRIMAUD, A., EEROLA, T. (2022). Emotional expression through musical cues: A comparison of production and perception approaches. PloS one, 17(12)
- ODIFREDDI, P. (2005). Penna, pennello e bacchetta: le tre invidie del matematico. Roma; Bari: Laterza.
- PETRARCA, S. (2010). Matematica per la musica e il suono. Roma: Aracne.
- PALMER, S. E., SCHLOSS, K. B., XU, Z., PRADO-LEÓN, L. R. (2013). Music-color associations are mediated by emotion. Proceedings of the National Academy of Sciences of the United States of America, 110(22), 8836–8841.
- PALMER, S. E., LANGLOIS, T. A., SCHLOSS, K. B. (2016). Music-to-Color Associations of Single-Line Piano Melodies in Non-synesthetes. Multisensory research, 29(1-3), 157–193.
- QUINN, I. (2006). General equal-tempered harmony (introduction and part I). Perspectives of New Music, 114-158.
- QUINN, I. (2007). General equal-tempered harmony: parts 2 and 3. Perspectives of New Music, 45(1), 4-63.
- ROBERTS, G.E. (2016). From music to mathematics: exploring the connections. Baltimore, Md.: Johns Hopkins University Press.
- ROBINSON, T. (2006, April). The End of Similarity? Semitonal Offset as Similarity Measure. In annual meeting of the Music Theory Society of New York State, Saratoga Springs, NY.
- RUSSELL, G. (1971). The Lydian Chromatic Concept of Tonal Organization for Improvisation: For All Instruments. Stati Uniti: Concept Publishing Company.
- SIVAKUMAR, A., TYMOCZKO, D. (2019). Intuitive Musical Homotopy: Algebraic, Geometric, Combinatorial, Topological and Applied Approaches to Understanding Musical Phenomena.
- SPENCE, C., DI STEFANO, N. (2022). Coloured hearing, colour music, colour organs, and the search for perceptually meaningful correspondences between colour and sound. i-Perception, 13(3)
- STRAUS, J. N. (2003). Uniformity, balance, and smoothness in atonal voice leading. Music Theory Spectrum, 25(2), 305-352.
- STRAUS, J. N. (2005). Voice leading in set-class space. Journal of Music Theory, 49(1), 45-108.
- TOUSSAINT, G.D. (2020). The geometry of musical rhythm: what makes a “good” rhythm good? Boca Raton, Fla: Taylor , Francis.
- TYMOCZKO, D. (2004). Scale networks and Debussy. Journal of Music Theory, 48(2), 219-294.
- TYMOCZKO, D. (2006). The geometry of musical chords. Science, 313(5783), 72-74.
- TYMOCZKO, D. (2008). Scale theory, serial theory and voice leading. Music Analysis, 27(1), 1-49.
- TYMOCZKO, D. (2008). Set-class similarity, voice leading, and the Fourier transform. Journal of Music Theory, 52(2), 251-272.
- TYMOCZKO, D. (2009). Three Conceptions of Musical Distance. Mathematics and Computation in Music. MCM 2009. Communications in Computer and Information Science, vol 38. Springer, Berlin, Heidelberg.
- TYMOCZKO, D. (2011). A Geometry of Music: Harmony and Counterpoint in the Extended Common Practice. New York, Oxford University Press.
- WALKER, J., DON, G. W. (2013). Mathematics and music: composition, perception, and performance. Boca Raton, Fla: CRC Press.
- WHITEFORD, K. L., SCHLOSS, K. B., HELWIG, N. E., PALMER, S. E. (2018). Color, Music, and Emotion: Bach to the Blues. i-Perception, 9(6) 
