// ===== micro:bit V2 — 3-in-1 Gadget =====
// Press button A to switch between 3 modes.
// A variable "mode" remembers which "app" you're on.

let best = 99999
let mode = 0
basic.showString("3-IN-1")

basic.forever(function () {
    if (mode == 0) {
        // 1) SOUND LIGHT SHOW — louder room = taller bars. Clap!
        led.plotBarGraph(input.soundLevel(), 160)

    } else if (mode == 1) {
        // 2) TILT THEREMIN — tilt ANY direction; a dot rolls around and the pitch follows it
        let ax = input.acceleration(Dimension.X)   // left / right tilt
        let ay = input.acceleration(Dimension.Y)   // forward / back tilt
        let col = Math.map(ax, -1023, 1023, 0, 4)
        col = Math.constrain(Math.round(col), 0, 4)
        let row = Math.map(ay, -1023, 1023, 0, 4)
        row = Math.constrain(Math.round(row), 0, 4)
        basic.clearScreen()
        led.plot(col, row)
        if (col == 2 && row == 2) {
            music.stopAllSounds()               // held flat & level = quiet
        } else {
            music.ringTone(200 + col * 110 + (4 - row) * 130)
        }

    } else {
        // 3) REACTION GAME — tap B the instant it flashes
        basic.showIcon(IconNames.Asleep)                 // "wait for it..."
        basic.pause(Math.randomRange(1000, 3000))        // random delay so you can't guess
        if (mode == 2) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)                                        // FLASH — press B now!
            let t0 = input.runningTime()
            while (!(input.buttonIsPressed(Button.B)) && mode == 2) {
                basic.pause(1)
            }
            if (mode == 2) {
                let rt = input.runningTime() - t0
                basic.clearScreen()
                if (rt < 100) {
                    basic.showString("TOO SOON")          // you jumped the gun
                } else if (rt < best) {
                    best = rt
                    basic.showNumber(rt)
                    basic.showString("NEW BEST")          // a real record!
                } else {
                    basic.showNumber(rt)
                    basic.showString("BEST")
                    basic.showNumber(best)                // so you always see the record
                }
                basic.pause(500)
            }
        }
    }
})

input.onButtonPressed(Button.A, function () {
    music.stopAllSounds()
    if (mode == 2) {
        mode = 0
    } else {
        mode = mode + 1
    }
    basic.clearScreen()
    if (mode == 0) {
        basic.showString("S")   // Sound
    } else if (mode == 1) {
        basic.showString("T")   // Tilt
    } else {
        basic.showString("R")   // Reaction
    }
})
