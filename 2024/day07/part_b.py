import time


def get_all_ops(nums, prev_ops):
    if len(nums) == 0:
        return [prev_ops]
    
    ops = get_all_ops(nums[1:], prev_ops + ['+'])
    ops += get_all_ops(nums[1:], prev_ops + ['*'])
    ops += get_all_ops(nums[1:], prev_ops + ['||'])

    return ops


def test_line(result, nums):
    ops = get_all_ops(nums[1:], [])
    for op in ops:
        op_sum = nums[0]
        for i in range(len(op)):
            if op[i] == '+':
                op_sum += nums[i + 1]
            elif op[i] == '*':
                op_sum *= nums[i + 1]
            else:
                op_sum = int(str(op_sum) + str(nums[i + 1]))
            if op_sum > result:
                break
        if op_sum == result:
            return True
        
    return False

t0 = time.time()
result_sum = 0
with open('input.txt', 'r') as file:
    for line in file:
        [result, nums] = line.strip().split(':')
        result = int(result)
        nums = [int(num) for num in nums.strip().split(' ')]
        if test_line(result, nums):
            result_sum += result
t1 = time.time()

print("Result:", result_sum, "in", t1 - t0)
