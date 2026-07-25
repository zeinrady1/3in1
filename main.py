best = 99999
mode = 0
basic.show_string("3-IN-1")

def on_forever():
    global best
    if mode == 0:
        led.plot_bar_graph(input.sound_level(), 160)
    elif mode == 1:
        ax = input.acceleration(Dimension.X)
        ay = input.acceleration(Dimension.Y)
        col = Math.map(ax, -1023, 1023, 0, 4)
        col = Math.constrain(Math.round(col), 0, 4)
        row = Math.map(ay, -1023, 1023, 0, 4)
        row = Math.constrain(Math.round(row), 0, 4)
        basic.clear_screen()
        led.plot(col, row)
        if col == 2 and row == 2:
            music.stop_all_sounds()
        else:
            music.ring_tone(200 + col * 110 + (4 - row) * 130)
    else:
        basic.show_icon(IconNames.ASLEEP)
        basic.pause(Math.random_range(1000, 3000))
        if mode == 2:
            basic.show_leds("""
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                """)
            t0 = input.running_time()
            while not (input.button_is_pressed(Button.B)) and mode == 2:
                basic.pause(1)
            if mode == 2:
                rt = input.running_time() - t0
                basic.clear_screen()
                if rt < 100:
                    basic.show_string("TOO SOON")
                elif rt < best:
                    best = rt
                    basic.show_number(rt)
                    basic.show_string("NEW BEST")
                else:
                    basic.show_number(rt)
                    basic.show_string("BEST")
                    basic.show_number(best)
                basic.pause(500)
basic.forever(on_forever)

def on_button_pressed_a():
    global mode
    music.stop_all_sounds()
    if mode == 2:
        mode = 0
    else:
        mode = mode + 1
    basic.clear_screen()
    if mode == 0:
        basic.show_string("S")
    elif mode == 1:
        basic.show_string("T")
    else:
        basic.show_string("R")
input.on_button_pressed(Button.A, on_button_pressed_a)
