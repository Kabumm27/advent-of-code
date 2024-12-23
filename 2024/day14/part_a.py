from functools import reduce
import re

width = 101
height = 103

robots = []
with open('input.txt', 'r') as file:
    for line in file:
        regex_data = re.search(r'p=(\d+),(\d+).+v=(-?\d+),(-?\d+)', line).groups()
        pos = (int(regex_data[1]), int(regex_data[0]))
        velocity = (int(regex_data[3]), int(regex_data[2]))
        robots.append({
            "p": pos,
            "v": velocity,
        })


def move(robot):
    new_pos = (robot['p'][0] + robot['v'][0], robot['p'][1] + robot['v'][1])
    if new_pos[0] < 0:
        new_pos = (new_pos[0] + height, new_pos[1])
    elif new_pos[0] >= height:
        new_pos = (new_pos[0] - height, new_pos[1])
    if new_pos[1] < 0:
        new_pos = (new_pos[0], new_pos[1] + width)
    elif new_pos[1] >= width:
        new_pos = (new_pos[0], new_pos[1] - width)

    return new_pos



robot_places = {}
for robot in robots:
    for i in range(100):
        robot["p"] = move(robot)

    # print(robot)
    if not robot['p'] in robot_places:
        robot_places[robot["p"]] = 1
    else:
        robot_places[robot['p']] += 1


for y in range(height):
    line = []
    for x in range(width):
        if (y, x) in robot_places:
            line.append(str(robot_places[(y, x)]))
        else:
            line.append('.')

    print(''.join(line))

quadrant_count = [0, 0, 0, 0]
for y in range(height):
    line = []
    for x in range(width):
        if (y, x) in robot_places:
            quadrant = 0
            if y < height // 2:
                quadrant += 0
            elif y > height // 2:
                quadrant += 2
            else:
                continue
            if x < width // 2:
                quadrant += 0
            elif x > width // 2:
                quadrant += 1
            else:
                continue

            quadrant_count[quadrant] += robot_places[(y, x)]

print(quadrant_count, reduce(lambda a, b: a * b, quadrant_count))
