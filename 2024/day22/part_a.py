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


result_sum = 0
for n in nums:
    result_sum += nth_secret(n, 2000)

print(result_sum)
