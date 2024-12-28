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


def get_permutations(search_list):
    if len(search_list) <= 2:
        return set()
    
    permutations = set()
    for i in range(len(search_list)):
        shortened_set = search_list[:i] + search_list[i+1:]
        permutations.add(tuple(shortened_set))
        # permutations = permutations.union(get_permutations(shortened_set))

    return permutations


search_lists = []
for start_node in pairs:
    search_list = [start_node]
    search_list.extend(pairs[start_node])
    search_list.sort()
    search_lists.append(search_list)


search_dict = {}
for s in sorted(search_lists):
    # print(s)
    permutations = get_permutations(s)
    for p in permutations:
        if p not in search_dict:
            search_dict[p] = 1
        else:
            search_dict[p] += 1


max_val = 0
max_key = ()
for key, value in search_dict.items():
    if len(key) == value:
        # print(key, value)
        if max_val < value:
            max_val = value
            max_key = key

print(max_val, ','.join(list(max_key)))
