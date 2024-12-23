commands = []
sparse_map = {}
player_pos = (0, 0)

wdith = 0
height = 0

with open('input.txt', 'r') as file:
    y = 0
    for line in file:
        line = line.strip()
        if line.startswith('#'):
            width = len(line)
            for (x, ch) in enumerate(list(line)):
                if ch == '#' or ch == 'O':
                    sparse_map[(y, x)] = ch
                elif ch == '@':
                    player_pos = (y, x)
            y += 1
        elif line.startswith('<') or line.startswith('>') or line.startswith('^') or line.startswith('v'):
            commands.extend(list(line))

    height = y

# print(commands)
# print(height, width)
# print(sparse_map)

def print_map():
    for y in range(height):
        line = ''
        for x in range(width):
            if (y, x) in sparse_map:
                line += sparse_map[(y,x)]
            elif (y, x) == player_pos:
                line += '@'
            else:
                line += '.'
        print(line)


def get_dir(command):
    if command == '<':
        return (0, -1)
    elif command == '>':
        return (0, 1)
    elif command == '^':
        return (-1, 0)
    else: # command == 'v'
        return (1, 0)


def check_dir(dir):
    check_pos = (player_pos[0] + dir[0], player_pos[1] + dir[1])
    while True:
        if not check_pos in sparse_map:
            return check_pos
        elif check_pos in sparse_map and sparse_map[check_pos] == '#':
            return None
        
        check_pos = (check_pos[0] + dir[0], check_pos[1] + dir[1])


def move(command):
    global player_pos
    dir = get_dir(command)
    next_empty_space = check_dir(dir)
    if next_empty_space:
        neighbour_space = (player_pos[0] + dir[0], player_pos[1] + dir[1])
        if next_empty_space == neighbour_space:
            player_pos = next_empty_space
        else:
            sparse_map[next_empty_space] = 'O'
            del sparse_map[neighbour_space]
            player_pos = neighbour_space


for command in commands:
    move(command)
    # print(command, player_pos)
    # print_map()
    # print("\n")

print_map()


result_sum = 0
for box in sparse_map:
    if sparse_map[box] == 'O':
        result_sum += box[0] * 100 + box[1]

print()
print("Result: ", result_sum)
