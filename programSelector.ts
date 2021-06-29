
namespace programSelector {
    const heading = 'Select a program to run:';

    let selectedIndex: number = 0;
    let programs: { [name: string]: Function } = {};

    export function showPrograms(i_programs: { [name: string]: Function }) {
        programs = i_programs;
        selectedIndex = 0;
        redraw();

        brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
            selectedIndex --;
            if (selectedIndex < 0) selectedIndex = Object.keys(programs).length - 1;
            redraw();
        });
        brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
            selectedIndex ++;
            if (selectedIndex > Object.keys(programs).length - 1) selectedIndex = 0;
            redraw();
        });
        brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
            if (Object.keys(programs).length != 0) {
                let programName: string = Object.keys(programs)[selectedIndex];
                brick.clearScreen();
                programs[programName]();
            }
        });
    }

    function redraw() {
        brick.showString(heading, 1);
        Object.keys(programs).forEach((key, idx) => {
            let prefix = idx == selectedIndex ? '> ' : '  ';
            brick.showString(prefix + key, idx + 2);
        });
    }
}