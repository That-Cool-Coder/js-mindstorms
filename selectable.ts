/*
const robot = {
    rotationsPerCm: 1 / 17.6,
    rotationsPerDegree: 0.5 / 90,
    wheelbaseWidth: 13,
    motorSet: motors.largeBC,
    colorSensor: sensors.color3
}

const buttons = [
    brick.buttonLeft,
    brick.buttonUp,
    brick.buttonRight,
    brick.buttonDown,
    brick.buttonEnter
];

const programs = [
    p_square,
    p_rectangle,
    p_circle,
    p_square,
    p_rectangle
];

const programNames = [
    'square',
    'rectangle',
    'circle'
];

const buttonIdToName: { [key: number]: string } = {
    20001: 'enter',
    20002: 'left',
    20003: 'right',
    20004: 'up',
    20005: 'down',
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

function p_square() {
    const squareCount = 1;
    const squareSize = 50;

    for (let i = 0; i < squareCount * 4; i++) {
        let rotations = squareSize * robot.rotationsPerCm;
        robot.motorSet.tank(50, 50, rotations, MoveUnit.Rotations);
        turn(-90);
    }
}

function p_rectangle() {
    const width = 50;
    const height = 100;
    const rectCount = 1;

    for (let i = 0; i < rectCount * 2; i++) {
        let rotations = width * robot.rotationsPerCm;
        robot.motorSet.tank(50, 50, rotations, MoveUnit.Rotations);
        turn(-90);
        rotations = height * robot.rotationsPerCm;
        robot.motorSet.tank(50, 50, rotations, MoveUnit.Rotations);
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

brick.clearScreen();
brick.showString('EV3 Program Selection', 1);

for (let idx = 0; idx < buttons.length; idx++) {
    let button = buttons[idx];
    let program = programs[idx];
    button.onEvent(ButtonEvent.Pressed, program);
    brick.showString(`Press ${buttonIdToName[button.id()]} to run ${programNames[idx]}`, idx + 2);
}
*/