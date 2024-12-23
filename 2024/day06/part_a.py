def get_next(y, x):
    if world[y][x] == '^':
        return (y - 1, x)
    elif world[y][x] == 'v':
        return (y + 1, x)
    elif world[y][x] == '<':
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


def get_start_pos():
    for (y, line) in enumerate(world):
        for (x, char) in enumerate(line):
            if char == '^':
                return (y, x)
            

def check_world_bounds(y, x):
    return y >= 0 and x >= 0 and y < len(world) and x < len(world[y])


world = []
with open('input.txt', 'r') as file:
    for line in file:
        world.append(list(line.strip()))


pos = get_start_pos()
while True:
    (nexty, nextx) = get_next(*pos)
    (posy, posx) = pos
    if not check_world_bounds(nexty, nextx):
        world[posy][posx] = 'X'
        break
    if world[nexty][nextx] == '#':
        world[posy][posx] = get_next_icon(world[posy][posx])
    else:
        world[nexty][nextx] = world[posy][posx]
        world[posy][posx] = 'X'
        pos = (nexty, nextx)


result_sum = 0
for line in world:
    for x in line:
        if x == 'X':
            result_sum += 1

print('Result sum:', result_sum)