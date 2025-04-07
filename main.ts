enum DigitalSignal {
    //% block="high"
    //% block.loc.ru="высокий"
    High = 1,

    //% block="low"
    //% block.loc.ru="низкий"
    Low = 0
}

enum AnalogCompare {
    //% block="equals"
    //% block.loc.ru="равен"
    Equal = 0,

    //% block="greater than"
    //% block.loc.ru="больше"
    Greater = 1,

    //% block="less than"
    //% block.loc.ru="меньше"
    Less = 2
}

namespace pins {
    /**
     * Runs code when the specified pin has a given digital signal
     */
    //% blockId="on_digital_signal"
    //% block="when on pin $pin digital signal is $signal"
    //% block.loc.ru="когда на пине $pin цифровой сигнал $signal"
    //% blockAllowMultiple=1
    //% group="Signals"
    //% group.loc.ru="Сигналы"
    //% weight=100
    export function onDigitalSignal(pin: DigitalPin, signal: DigitalSignal, code: () => void): void {
        control.inBackground(() => {
            while (true) {
                if (pins.digitalReadPin(pin) == signal) {
                    code()
                }
                basic.pause(50)
            }
        })
    }

    /**
     * Runs code when the analog signal on the pin meets the condition
     */
    //% blockId="on_analog_signal"
    //% block="when on pin $pin analog signal $cmp $value"
    //% block.loc.ru="когда на пине $pin аналоговый сигнал $cmp $value"
    //% blockAllowMultiple=1
    //% group="Signals"
    //% group.loc.ru="Сигналы"
    //% weight=90
    export function onAnalogSignal(pin: AnalogPin, cmp: AnalogCompare, value: number, code: () => void): void {
        control.inBackground(() => {
            while (true) {
                const analog = pins.analogReadPin(pin);
                let trigger = false;

                switch (cmp) {
                    case AnalogCompare.Equal:
                        trigger = (analog == value);
                        break;
                    case AnalogCompare.Greater:
                        trigger = (analog > value);
                        break;
                    case AnalogCompare.Less:
                        trigger = (analog < value);
                        break;
                }

                if (trigger) {
                    code();
                }

                basic.pause(50);
            }
        });
    }
}
