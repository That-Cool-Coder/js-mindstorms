const robot = {
    rotationsPerCm : 1 / 17.6,
    rotationsPerDegree : 0,
    wheelbaseWidth : 10,
    motorSet : motors.largeBC,
}

// Init here so we can reference robot
robot.rotationsPerDegree = Math.PI * robot.wheelbaseWidth
    * robot.rotationsPerCm / 360;

function waitForEnterButton() {
    control.waitForEvent(0, 0);
}

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
    const radius = 50;
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

waitForEnterButton();
p_circle();