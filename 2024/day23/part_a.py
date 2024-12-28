pairs = {}
with open("input.txt") as file:
    for line in file:
        pair = line.strip().split('-')
        if not pair[0] in pairs:
            pairs[pair[0]] = []
        if not pair[1] in pairs:
            pairs[pair[1]] = []
        pairs[pair[0]].append(pair[1])
        pairs[pair[1]].append(pair[0])


matches = []
for start_node in pairs:
    neigbours1 = pairs[start_node]
    for neighbour1 in neigbours1:
        neigbours2 = pairs[neighbour1]
        for neighbour2 in neigbours2:
            if neighbour2 in neigbours1:
                if start_node[0] == 't' or neighbour1[0] == 't' or neighbour2[0] == 't':
                  match_tuple = tuple(sorted([start_node, neighbour1, neighbour2]))
                  if match_tuple not in matches:
                    # print("Found neighbours", start_node, neighbour1, neighbour2)
                    matches.append(match_tuple)


# for m in sorted(matches):
#   print(m)

print(len(matches))