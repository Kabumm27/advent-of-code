rules = {}
page_nums = []
with open("input.txt") as file:
    for line in file:
        if "|" in line:
            [left, right] = line.strip().split("|")
            if left not in rules:
                rules[left] = [right]
            else:
                rules[left].append(right)
                rules[left].sort()
        elif "," in line:
            page_nums.append(line.strip().split(","))


# print(rules)
# print(page_nums)


def check_rules(nums):
    broken_rules = []
    for i in range(len(nums)):
        n = nums[i]
        if n not in rules:
            continue

        for after_n in rules[n]:
            if after_n in nums[:i]:
                # print("index", nums[:i].index(after_n))
                # print(nums, n, after_n, i)
                broken_rules.append(after_n)
    return broken_rules


def fix_rules(nums):
    broken_rules = sorted(check_rules(nums))
    while len(broken_rules) > 0:
        # print(nums, broken_rules)
        index = nums.index(broken_rules[0])
        nums[index], nums[index + 1] = nums[index + 1], nums[index]
        broken_rules = sorted(check_rules(nums))

    return nums


result_sum = 0
for nums in page_nums:
    if len(check_rules(nums)) > 0:
        fixed_nums = fix_rules(nums)
        result_sum += int(fixed_nums[len(fixed_nums) // 2])
print(result_sum)
