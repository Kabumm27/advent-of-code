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
        elif "," in line:
            page_nums.append(line.strip().split(","))


# print(rules)
# print(page_nums)


def check_rules(nums):
    for i in range(len(nums)):
        n = nums[i]
        if n not in rules:
            continue

        for after_n in rules[n]:
            if after_n in nums[:i]:
                return False
    return True


result_sum = 0
for nums in page_nums:
    if check_rules(nums):
        result_sum += int(nums[len(nums) // 2])
print(result_sum)
