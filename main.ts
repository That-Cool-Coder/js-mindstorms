const robot = {
    cmPerRotation : 17.6,
    degreesPerRotation : 1 / 90,
    motorSet : motors.largeBC
}

function turn(degrees: number, motorSpeed: number = 50) {
    degrees = (degrees + 180) % 360 - 180;
    if (degrees < 0) {
        robot.motorSet.tank(-motorSpeed,
            motorSpeed, degrees * robot.degreesPerRotation,
            MoveUnit.Rotations);
    }
    else {
        robot.motorSet.tank(motorSpeed,
            -motorSpeed, degrees * robot.degreesPerRotation,
            MoveUnit.Rotations);
    }
}

function p_square() {
    const squareCount = 1;
    const squareSize = 50;

    for (let i = 0; i < squareCount * 4; i++) {
        let rotations = squareSize * robot.cmPerRotation;
        robot.motorSet.tank(50, 50, rotations, MoveUnit.Rotations);
        turn(-90);
    }
}

function p_rectangle() {
    const width = 50;
    const height = 100;
    const rectCount = 1;

    for (let i = 0; i < rectCount * 2; i++) {
        let rotations = width * robot.cmPerRotation;
        robot.motorSet.tank(50, 50, rotations, MoveUnit.Rotations);
        turn(-90);
        rotations = height * robot.cmPerRotation;
        robot.motorSet.tank(50, 50, rotations, MoveUnit.Rotations);
        turn(-90);
    }
}

square();