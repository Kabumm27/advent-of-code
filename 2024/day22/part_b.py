nums = []
with open("input.txt") as file:
    for line in file:
        nums.append(int(line.strip()))

prune_value = 0b111111111111111111111111


def next_secret(num):
    num = ((num << 6) ^ num) & prune_value
    num = ((num >> 5) ^ num) & prune_value
    num = ((num << 11) ^ num) & prune_value

    return num


def nth_secret(num, n):
    for i in range(0, n):
        num = next_secret(num)
    return num


# sequenze = [-2, 1, -1, 3]
sequenze_map = {}


def find_sequenzes(num):
    local_sequenze_map = {}
    current_sequenze = []
    last_price = num % 10
    for i in range(2000):
        num = next_secret(num)
        price = num % 10
        current_sequenze.append(price - last_price)
        last_price = price
        if len(current_sequenze) > 4:
            current_sequenze = current_sequenze[-4:]

        sequenze_tuple = tuple(current_sequenze)
        if sequenze_tuple not in local_sequenze_map:
            local_sequenze_map[sequenze_tuple] = price

    for key, value in local_sequenze_map.items():
        if key not in sequenze_map:
            sequenze_map[key] = value
        else:
            sequenze_map[key] += value


for n in nums:
    find_sequenzes(n)

max_val = 0
max_key = ()
for key, value in sequenze_map.items():
    if value > max_val:
        max_val = value
        max_key = key

print(max_key, max_val)
