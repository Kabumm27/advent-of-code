codes = []
with open("input.txt") as file:
    for line in file:
        codes.append(line.strip())

numeric_keypad = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [None, '0', 'A'],
]

directional_keypad = [
    [None, '^', 'A'],
    ['<', 'v', '>']
]

def get_coords(keypad, ch):
    for (y, row) in enumerate(keypad):
        for (x, ch2) in enumerate(row):
            if ch == ch2:
                return (y, x)
            

def get_directions(keypad, start, end):
    delta_y = end[0] - start[0]
    delta_x = end[1] - start[1]

    commands = ''
    if delta_y >= 0:
        commands += 'v' * abs(delta_y)
    if delta_x >= 0:
        commands += '>' * abs(delta_x)
    if delta_x < 0:
        commands += '<' * abs(delta_x)
    if delta_y < 0:
        commands += '^' * abs(delta_y)
        
    if keypad == numeric_keypad:
        if 'v>' in commands and start == (2, 0):
            commands = commands.replace('v>', '>v')
    
    return commands

code_lookup = {}
def get_keypad_commands(keypad, code):
    commands = ''
    cursor = get_coords(keypad, 'A')
    for ch in code:
        target = get_coords(keypad, ch)
        commands += get_directions(keypad, cursor, target) + 'A'
        cursor = target

    if keypad == directional_keypad:
        if code not in code_lookup:
            code_lookup[code] = commands
        else:
            print('found!')
    return commands


def parse_commands(keypad, commands):
    output = ''
    cursor = get_coords(keypad, 'A')
    for command in commands:
      (y, x) = cursor
      if not keypad[y][x]:
          print((y, x), commands, command)
          print('booom')
      i = ['^', '>', 'v', '<', 'A'].index(command)
      next_cursor = [(y - 1, x), (y, x + 1), (y + 1, x), (y, x - 1), None][i]
      if next_cursor:
        cursor = next_cursor
      else:
        output += keypad[y][x]

    return output


result_sum = 0
# codes = ['456A']
for code in codes:
  commands = get_keypad_commands(numeric_keypad, code)
  parse_commands(numeric_keypad, commands)
  for i in range(25):
    print(i)
    commands = get_keypad_commands(directional_keypad, commands)
    parse_commands(directional_keypad, commands)
  code_as_int = int(code[:-1])
  result_sum += code_as_int * len(commands)
  # print(code, str(code_as_int), '*', str(len(commands)))


print(result_sum)
