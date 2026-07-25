let best = 99999
let mode = 0
basic.showString("3-IN-1")
basic.forever(function on_forever() {
    let ax: number;
    let ay: number;
    let col: number;
    let row: number;
    let t0: number;
    let rt: number;
    
    if (mode == 0) {
        led.plotBarGraph(input.soundLevel(), 160)
    } else if (mode == 1) {
        ax = input.acceleration(Dimension.X)
        ay = input.acceleration(Dimension.Y)
        col = Math.map(ax, -1023, 1023, 0, 4)
        col = Math.constrain(Math.round(col), 0, 4)
        row = Math.map(ay, -1023, 1023, 0, 4)
        row = Math.constrain(Math.round(row), 0, 4)
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
            t0 = input.runningTime()
            while (!input.buttonIsPressed(Button.B) && mode == 2) {
                basic.pause(1)
            }
            if (mode == 2) {
                rt = input.runningTime() - t0
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
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
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
