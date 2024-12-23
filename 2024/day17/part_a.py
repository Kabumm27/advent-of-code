#Register A: 33024962
#Register B: 0
#Register C: 0

#Program: 2,4, 1,3, 7,5, 1,5, 0,3, 4,2, 5,5, 3,0

program = [2,4,1,3,7,5,1,5,0,3,4,2,5,5,3,0]


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
        out.append(str(combo(operand, register) & 7))
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
    
    print('Output:', ','.join(out))


def optimized_code():
    a = 33024962
    out = []

    while a > 0:
        b = a & 7
        c = a >> (b ^ 3)
        out.append(str(b ^ 6 ^ c & 7))
        a = a >> 3

    print(','.join(out))

# optimized_code()

run_code(33024962)
