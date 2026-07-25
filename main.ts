let best = 99999
let mode = 0
basic.showString("3-IN-1")

basic.forever(function () {
    if (mode == 0) {
        led.plotBarGraph(input.soundLevel(), 160)
    } else if (mode == 1) {
        let ax = input.acceleration(Dimension.X)
        let ay = input.acceleration(Dimension.Y)
        let col = 2
        let row = 2
        if (ax < -550) {
            col = 0
        } else if (ax < -200) {
            col = 1
        } else if (ax < 200) {
            col = 2
        } else if (ax < 550) {
            col = 3
        } else {
            col = 4
        }
        if (ay < -550) {
            row = 0
        } else if (ay < -200) {
            row = 1
        } else if (ay < 200) {
            row = 2
        } else if (ay < 550) {
            row = 3
        } else {
            row = 4
        }
        basic.clearScreen()
        led.plot(col, row)
        if (col == 2 && row == 2) {
            music.stopAllSounds()
        } else {
            music.ringTone(200 + col * 110 + (4 - row) * 130)
        }
    } else {
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
            let t0 = input.runningTime()
            while (!(input.buttonIsPressed(Button.B)) && mode == 2) {
                basic.pause(1)
            }
            if (mode == 2) {
                let rt = input.runningTime() - t0
                basic.clearScreen()
                if (rt < 100) {
                    basic.showString("TOO SOON")
                } else if (rt < best) {
                    best = rt
                    basic.showNumber(rt)
                    basic.showString("NEW BEST")
                } else {
                    basic.showNumber(rt)
                    basic.showString("BEST")
                    basic.showNumber(best)
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
        basic.showString("S")
    } else if (mode == 1) {
        basic.showString("T")
    } else {
        basic.showString("R")
    }
})
