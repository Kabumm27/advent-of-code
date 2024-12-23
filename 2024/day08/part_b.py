height = 0
width = 0
pos_map = dict()
with open('input.txt', 'r') as file:
    for (y, line) in enumerate(file):
        height = y + 1
        width = len(line)
        for (x, ch) in enumerate(line.strip()):
            if ch == '.':
                continue
            if ch not in pos_map:
                pos_map[ch] = []
            pos_map[ch].append((y, x))

# print(pos_map)
# print(height, width)

points = dict()
for (ch, pos) in pos_map.items():
    print(f'{ch}: {pos}')
    for i in range(len(pos)):
        for j in range(i + 1, len(pos)):
            vec1 = pos[i]
            vec2 = pos[j]
            offsetY = vec1[0] - vec2[0]
            offsetX = vec1[1] - vec2[1]

            p1 = (vec1[0] + offsetY, vec1[1] + offsetX)
            if p1[0] >= 0 and p1[1] >= 0 and p1[0] < height and p1[1] < width:
                points[p1] = True
            p2 = (vec2[0] - offsetY, vec2[1] - offsetX)
            if p2[0] >= 0 and p2[1] >= 0 and p2[0] < height and p2[1] < width:
                points[p2] = True


print(len(points))
