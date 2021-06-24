const squareCount = 1;

const degreesPerTurn = 90 / 3;

function turn(degrees: number, motorSpeed: number=0) {
    degrees = (degrees + 180) % 360 - 180;
    let lMotorMult;
    let rMotorMult;
    if (degrees < 0) {
        lMotorMult = -1;
        rMotorMult = 1;
    }
    else {
        lMotorMult = -1;
        rMotorMult = 1;
    }
    motors.largeBC.tank(lMotorMult * motorSpeed,
        rMotorMult * motorSpeed, degrees * degreesPerTurn,
        MoveUnit.Rotations);
}

for (let i = 0; i < squareCount; i ++) {
    turn(-90);
}