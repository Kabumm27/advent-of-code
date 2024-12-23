import copy

def get_next(local_world, y, x):
    if local_world[y][x] == '^':
        return (y - 1, x)
    elif local_world[y][x] == 'v':
        return (y + 1, x)
    elif local_world[y][x] == '<':
        return (y, x - 1)
    else:
        return (y, x + 1)

def get_next_icon(current_icon):
    if current_icon == '^':
        return '>'
    elif current_icon == '>':
        return 'v'
    elif current_icon == 'v':
        return '<'
    else:
        return '^'

def check_loop(local_world):
    return False


def get_start_pos():
    for (y, line) in enumerate(world):
        for (x, char) in enumerate(line):
            if char == '^':
                return (y, x)
            

def check_world_bounds(y, x):
    return y >= 0 and x >= 0 and y < len(world) and x < len(world[y])


world = []
with open('input_sample.txt', 'r') as file:
    for line in file:
        world.append(list(line.strip()))

loop_counter = 0
for y in range(len(world)):
    for x in range(len(world[0])):
        print('Run with:', y, x)
        tmp_world = copy.deepcopy(world)
        if tmp_world[y][x] != '.':
            continue

        tmp_world[y][x] = '#'

        pos = get_start_pos()
        just_rotated = False
        while True:
            (nexty, nextx) = get_next(tmp_world, *pos)
            (posy, posx) = pos
            if not check_world_bounds(nexty, nextx):
                tmp_world[posy][posx] = 'X'
                break
            if check_loop(tmp_world):
                print('loop detected')
                for line in tmp_world:
                    print(line)
                loop_counter += 1
                break
            if tmp_world[nexty][nextx] == '#':
                tmp_world[posy][posx] = get_next_icon(tmp_world[posy][posx])
                just_rotated = True
            else:
                tmp_world[nexty][nextx] = tmp_world[posy][posx]
                if just_rotated:
                    tmp_world[posy][posx] = '+'
                    just_rotated = False
                else:
                    tmp_world[posy][posx] = 'X'
                pos = (nexty, nextx)

print('Result sum:', loop_counter)
