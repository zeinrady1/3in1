input.onButtonPressed(Button.A, function () {
    music.stopAllSounds()
    if (mode == 2) {
        mode = 0
    } else {
        mode = mode + 1
    }
    basic.clearScreen()
    if (mode == 0) {
        basic.showString("S")
    } else if (mode == 1) {
        basic.showString("T")
    } else {
        basic.showString("R")
    }
})
let best = 0
let rt = 0
let t0 = 0
let tilt = 0
let mode = 0
basic.showString("3-IN-1")
basic.forever(function () {
    if (mode == 0) {
        // 1) SOUND LIGHT SHOW — louder room = taller bars. Clap!
        led.plotBarGraph(
        input.soundLevel(),
        160
        )
    } else if (mode == 1) {
        // 2) TILT THEREMIN — tilt to play notes, flat = silent
        tilt = input.acceleration(Dimension.X)
        basic.clearScreen()
        if (tilt < -450) {
            music.ringTone(262)
            led.plot(0, 2)
        } else if (tilt < -150) {
            music.ringTone(330)
            led.plot(1, 2)
        } else if (tilt < 150) {
            music.stopAllSounds()
            led.plot(2, 2)
        } else if (tilt < 450) {
            music.ringTone(523)
            led.plot(3, 2)
        } else {
            music.ringTone(659)
            led.plot(4, 2)
        }
    } else {
        // 3) REACTION GAME — tap B the instant it flashes
        basic.showIcon(IconNames.Asleep)
        basic.pause(Math.randomRange(1000, 3000))
        if (mode == 2) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            t0 = input.runningTime()
            while (!(input.buttonIsPressed(Button.B)) && mode == 2) {
                basic.pause(1)
            }
            if (mode == 2) {
                rt = input.runningTime() - t0
                basic.clearScreen()
                basic.showNumber(rt)
                if (best == 0 || rt < best) {
                    best = rt
                    basic.showString("BEST")
                }
                basic.pause(1500)
            }
        }
    }
})
