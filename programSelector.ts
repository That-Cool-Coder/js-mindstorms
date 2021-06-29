
namespace programSelector {
    const heading = 'Select a program to run:';

    let selectedIndex: number = 0;
    let programs: { [name: string]: Function } = {};
    let visible = false;

    export function showPrograms(i_programs: { [name: string]: Function }) {
        visible = true;
        programs = i_programs;
        selectedIndex = 0;
        redraw();

        brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
            if (visible) {
                selectedIndex --;
                if (selectedIndex < 0) selectedIndex = Object.keys(programs).length - 1;
                redraw();
            }
        });
        brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
            if (visible) {
                selectedIndex ++;
                if (selectedIndex > Object.keys(programs).length - 1) selectedIndex = 0;
                redraw();
            }
        });

        brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
        if (Object.keys(programs).length != 0) {
            let programName: string = Object.keys(programs)[selectedIndex];
            brick.clearScreen();
            visible = false;
            programs[programName]();
        }
        visible = false;
    }

    function redraw() {
        brick.clearScreen();
        brick.showString(heading, 1);
        Object.keys(programs).forEach((key, idx) => {
            let prefix = idx == selectedIndex ? '> ' : '  ';
            brick.showString(prefix + key, idx + 2);
        });
    }
}