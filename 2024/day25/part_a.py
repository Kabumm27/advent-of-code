keys = []
locks = []
with open("input.txt") as file:
    is_lock = False
    data = [-1, -1, -1, -1, -1]
    for line in file:
        line = line.strip()
        if not line:
            if is_lock:
                locks.append(data)
            else:
                keys.append(data)
            is_lock = False
            data = [-1, -1, -1, -1, -1]
            continue

        if data == [-1, -1, -1, -1, -1] and line == "#####":
            is_lock = True
        for i, ch in enumerate(line):
            if ch == "#":
                data[i] += 1

    if is_lock:
        locks.append(data)
    else:
        keys.append(data)


# print(keys)
# print(locks)


def check_key_fit(lock, key):
    for i in range(5):
        if lock[i] + key[i] > 5:
            return False
    return True


result_sum = 0
for lock in locks:
    for key in keys:
        if check_key_fit(lock, key):
            # print(lock, key)
            result_sum += 1
print(result_sum)
