#Register A: 33024962
#Register B: 0
#Register C: 0

#Program: 2,4, 1,3, 7,5, 1,5, 0,3, 4,2, 5,5, 3,0

program = [0,3,5,4,3,0]

# def optimized_code(a):
#     out = []

#     while a > 0:
#         b = a & 7
#         c = a >> (b ^ 3)
#         out.append(b ^ 6 ^ c & 7)
#         a = a >> 3

#     return out

def combo(operand, register):
    if operand >= 0 and operand <= 3:
        return operand
    elif operand == 4:
        return register['a']
    elif operand == 5:
        return register['b']
    elif operand == 6:
        return register['c']


def run_instruction(opcode, operand, instruction_pointer, register, out):
    if opcode == 0:
        register['a'] = register['a'] >> combo(operand, register)
    elif opcode == 1:
        register['b'] = register['b'] ^ operand
    elif opcode == 2:
        register['b'] = combo(operand, register) & 7
    elif opcode == 3:
        if register['a'] != 0:
            return operand
    elif opcode == 4:
        register['b'] = register['b'] ^ register['c']
    elif opcode == 5:
        out.append(combo(operand, register) & 7)
    elif opcode == 6:
        register['b'] = register['a'] >> combo(operand, register)
    elif opcode == 7:
        register['c'] = register['a'] >> combo(operand, register)

    return instruction_pointer + 2


def run_code(a):
    instruction_pointer = 0
    register = { 'a': a, 'b': 0, 'c': 0 }
    out = []

    while instruction_pointer < len(program):
        opcode = program[instruction_pointer + 0]
        operand = program[instruction_pointer + 1]
        instruction_pointer = run_instruction(opcode, operand, instruction_pointer, register, out)
    
    return out


results = []

def reverse_code(a, out_length):
    if len(run_code(a)) > 16:
        return

    for n in range(8):
        if run_code(a + n) == program[-out_length:]:
            print(run_code(a + n))
            if out_length < len(program):
                reverse_code((a + n) << 3, out_length + 1)
            else:
                results.append(a + n)


reverse_code(0, 1)
print("Results:", results)
print("")
print('Lowest Result:', min(results))
print(run_code(min(results)))
