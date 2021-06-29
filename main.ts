const robot = {
    rotationsPerCm: 1 / 17.6,
    rotationsPerDegree: 0.5 / 90,
    wheelbaseWidth: 13,
    motorSet: motors.largeBC,
    colorSensor: sensors.color3
}

const programs:{ [name: string]: Function } = {
    'square': p_square,
    'rectangle': p_rectangle,
    'circle': p_circle,
    'sensortest': p_sensorTest
};

function turn(degrees: number, motorSpeed: number = 50) {
    degrees = (degrees + 180) % 360 - 180;
    if (degrees < 0) {
        robot.motorSet.tank(-motorSpeed,
            motorSpeed, degrees * robot.rotationsPerDegree,
            MoveUnit.Rotations);
    }
    else {
        robot.motorSet.tank(motorSpeed,
            -motorSpeed, degrees * robot.rotationsPerDegree,
            MoveUnit.Rotations);
    }
}

function tankDrive(distanceCm: number, motorSpeed: number = 50) {
    robot.motorSet.tank(motorSpeed, motorSpeed,
        distanceCm * robot.rotationsPerCm, MoveUnit.Rotations);
}

function playMusic(musicData: string) {
    /* Structure of musicData
    musicData is a list of notes seperated by \n
    each note has three sections which are seperated by ,
    
    first section is note name - c, cs, db, d, ds, eb, e, es...
    second section is octave - in range 0-8
    third section is duration, in beats

    EG
    c,3,1\n // play C3 for 1 beat
    ds,3,2\n // play D-sharp3 for 2 beats
    */

    const noteNameToNote = {
        'c': Note.C,
        'cs': Note.CSharp,
        'db': Note.CSharp,
        'd': Note.D,
        'ds': Note.DSharp,
        'eb': Note.DSharp,
        'e': Note.E,
        'fb': Note.E,
        'es': Note.F,
        'f': Note.F,
        'fs': Note.FSharp,
        'gb' : Note.FSharp,
        'g' : Note.G,
        'gs' : Note.GSharp,
        'ab' : Note.GSharp,
        'a' : Note.A,
        'as' : Note.ASharp,
        'bb' : Note.ASharp,
        'b' : Note.B,
        'bs' : Note.C,
        'cb' : Note.B
    }

    let notes = musicData.split('\n');
    notes.forEach(note => {
        let noteSections = note.split(',');
        if (noteSections.length == 3) {
            Note.C4
            music.playTone(Note., BeatFraction.Half)
        }
    });
}

function p_square() {
    const squareCount = 1;
    const squareSize = 50;

    for (let i = 0; i < squareCount * 4; i++) {
        tankDrive(squareSize, 50);
        turn(-90);
    }
}

function p_rectangle() {
    const width = 50;
    const height = 100;
    const rectCount = 1;

    for (let i = 0; i < rectCount * 2; i++) {
        tankDrive(width, 50);
        turn(-90);
        tankDrive(height, 50);
        turn(-90);
    }
}

function p_circle() {
    const radius = 30;
    const motorSpeed = 100;
    const clockwise = true;

    const neutralRotations = radius * Math.PI * 2 * robot.rotationsPerCm;

    const innerCircum =
        (radius - robot.wheelbaseWidth / 2) * Math.PI * 2;
    const innerRotations = innerCircum * robot.rotationsPerCm;
    let innerSpeed = motorSpeed * (innerRotations / neutralRotations);

    const outerCircum =
        (radius + robot.wheelbaseWidth / 2) * Math.PI * 2;
    const outerRotations = outerCircum * robot.rotationsPerCm;
    let outerSpeed = motorSpeed * (outerRotations / neutralRotations);

    // Speed is capped to 100
    // We don't want only one wheel getting capped - 
    // (as that would mess up the whole thing)
    // So reduce both to fit
    if (outerSpeed > 100) {
        const reduction = 100 / outerSpeed;
        innerSpeed *= reduction;
        outerSpeed *= reduction;
    }

    if (clockwise) {
        robot.motorSet.tank(outerSpeed, innerSpeed,
            neutralRotations, MoveUnit.Rotations);
    }
    else {
        robot.motorSet.tank(innerSpeed, outerSpeed,
            neutralRotations, MoveUnit.Rotations);
    }
}

function p_sensorTest() {
    robot.colorSensor.setThreshold(Light.Dark, 10);

    function createListener() {
        robot.colorSensor.onLightDetected(LightIntensityMode.Reflected, Light.Dark, () => {
            tankDrive(-10, 50);
            turn(-90, 50);
            createListener();
            tankDrive(Infinity, 50);
        });
    }
    createListener();
    tankDrive(Infinity, 50);
}

programSelector.showPrograms(programs);