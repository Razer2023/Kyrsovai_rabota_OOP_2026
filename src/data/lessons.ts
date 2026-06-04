// CodeStreak - Python Course Data

export interface Exercise {
  id: string;
  type: 'choice' | 'insert' | 'write' | 'fix' | 'translate' | 'card';
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
  explanation?: string;
  xp: number;
}

export interface Lesson {
  id: string;
  title: string;
  exercises: Exercise[];
}

export interface Skill {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  requiredSkills: string[];
  xpReward: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredSkills: string[];
  xpReward: number;
  starterCode: string;
  solution: string;
  tests: string[];
}

export const skills: Skill[] = [
  {
    id: 'basics',
    title: 'Основы',
    icon: '🐣',
    description: 'Первые шаги в Python: print, комментарии, типы данных',
    requiredSkills: [],
    xpReward: 100,
    lessons: [
      {
        id: 'basics-1',
        title: 'Привет, мир!',
        exercises: [
          {
            id: 'b1-1',
            type: 'card',
            question: 'print()',
            code: 'print("Hello!")',
            correctAnswer: 'Выводит текст на экран',
            xp: 5
          },
          {
            id: 'b1-2',
            type: 'choice',
            question: 'Какая функция выводит текст на экран в Python?',
            options: ['echo()', 'print()', 'console.log()', 'printf()'],
            correctAnswer: 'print()',
            xp: 10
          },
          {
            id: 'b1-3',
            type: 'insert',
            question: 'Вставь пропущенное слово, чтобы вывести "Hello"',
            code: '___("Hello")',
            options: ['print', 'echo', 'say', 'write'],
            correctAnswer: 'print',
            xp: 10
          },
          {
            id: 'b1-4',
            type: 'write',
            question: 'Напиши код, который выводит "Привет, мир!"',
            correctAnswer: ['print("Привет, мир!")', "print('Привет, мир!')"],
            hint: 'Используй функцию print()',
            xp: 15
          },
          {
            id: 'b1-5',
            type: 'fix',
            question: 'Исправь ошибку в коде:',
            code: 'prnt("Hello")',
            correctAnswer: 'print("Hello")',
            xp: 10
          },
          {
            id: 'b1-6',
            type: 'choice',
            question: 'Что выведет этот код: print("2 + 2")?',
            options: ['4', '2 + 2', 'Ошибка', '22'],
            correctAnswer: '2 + 2',
            explanation: 'Текст в кавычках выводится как есть',
            xp: 10
          }
        ]
      },
      {
        id: 'basics-2',
        title: 'Числа и математика',
        exercises: [
          {
            id: 'b2-1',
            type: 'card',
            question: 'Оператор +',
            code: '2 + 3  # = 5',
            correctAnswer: 'Сложение чисел',
            xp: 5
          },
          {
            id: 'b2-2',
            type: 'choice',
            question: 'Что выведет print(5 + 3)?',
            options: ['53', '8', '5 + 3', 'Ошибка'],
            correctAnswer: '8',
            xp: 10
          },
          {
            id: 'b2-3',
            type: 'choice',
            question: 'Какой оператор используется для деления?',
            options: ['/', '\\', ':', 'div'],
            correctAnswer: '/',
            xp: 10
          },
          {
            id: 'b2-4',
            type: 'insert',
            question: 'Дополни код, чтобы получить 20:',
            code: 'print(10 ___ 2)',
            options: ['+', '-', '*', '/'],
            correctAnswer: '*',
            xp: 10
          },
          {
            id: 'b2-5',
            type: 'write',
            question: 'Напиши код, который выводит результат 100 / 4',
            correctAnswer: ['print(100 / 4)', 'print(100/4)'],
            xp: 15
          },
          {
            id: 'b2-6',
            type: 'choice',
            question: 'Что делает оператор ** в Python?',
            options: ['Умножение', 'Возведение в степень', 'Комментарий', 'Деление'],
            correctAnswer: 'Возведение в степень',
            xp: 10
          },
          {
            id: 'b2-7',
            type: 'translate',
            question: 'Напиши код: "Выведи 2 в степени 10"',
            correctAnswer: ['print(2 ** 10)', 'print(2**10)', 'print(pow(2, 10))'],
            xp: 15
          }
        ]
      },
      {
        id: 'basics-3',
        title: 'Комментарии',
        exercises: [
          {
            id: 'b3-1',
            type: 'card',
            question: '# Комментарий',
            code: '# Это комментарий\nprint("Hello")  # И это тоже',
            correctAnswer: 'Текст, который Python игнорирует',
            xp: 5
          },
          {
            id: 'b3-2',
            type: 'choice',
            question: 'Как написать однострочный комментарий в Python?',
            options: ['// комментарий', '# комментарий', '/* комментарий */', '-- комментарий'],
            correctAnswer: '# комментарий',
            xp: 10
          },
          {
            id: 'b3-3',
            type: 'fix',
            question: 'Исправь синтаксис комментария:',
            code: '// Это мой код\nprint("Hello")',
            correctAnswer: '# Это мой код\nprint("Hello")',
            xp: 10
          },
          {
            id: 'b3-4',
            type: 'choice',
            question: 'Что выведет этот код?\n# print("Hello")\nprint("World")',
            options: ['Hello', 'World', 'HelloWorld', 'Ошибка'],
            correctAnswer: 'World',
            xp: 10
          },
          {
            id: 'b3-5',
            type: 'insert',
            question: 'Добавь символ комментария:',
            code: '___ Это комментарий\nprint("Код")',
            options: ['#', '//', '--', '/*'],
            correctAnswer: '#',
            xp: 10
          }
        ]
      },
      {
        id: 'basics-4',
        title: 'Строки',
        exercises: [
          {
            id: 'b4-1',
            type: 'card',
            question: 'Строка (string)',
            code: '"Привет"  # или \'Привет\'',
            correctAnswer: 'Текст в кавычках',
            xp: 5
          },
          {
            id: 'b4-2',
            type: 'choice',
            question: 'Какие кавычки можно использовать для строк в Python?',
            options: ['Только двойные "', 'Только одинарные \'', 'Любые: " или \'', 'Только обратные `'],
            correctAnswer: 'Любые: " или \'',
            xp: 10
          },
          {
            id: 'b4-3',
            type: 'choice',
            question: 'Что выведет print("Hello" + " " + "World")?',
            options: ['Hello World', 'HelloWorld', 'Hello + World', 'Ошибка'],
            correctAnswer: 'Hello World',
            xp: 10
          },
          {
            id: 'b4-4',
            type: 'write',
            question: 'Напиши код, который выводит "Python" и "программирование" через пробел',
            correctAnswer: ['print("Python" + " " + "программирование")', 'print("Python программирование")', "print('Python программирование')"],
            xp: 15
          },
          {
            id: 'b4-5',
            type: 'fix',
            question: 'Исправь ошибку:',
            code: 'print("Hello World\')',
            correctAnswer: 'print("Hello World")',
            xp: 10
          },
          {
            id: 'b4-6',
            type: 'choice',
            question: 'Что делает оператор * со строкой?',
            options: ['Ошибка', 'Умножает на число', 'Повторяет строку', 'Ничего'],
            correctAnswer: 'Повторяет строку',
            xp: 10
          }
        ]
      },
      {
        id: 'basics-5',
        title: 'Типы данных',
        exercises: [
          {
            id: 'b5-1',
            type: 'card',
            question: 'int',
            code: '42, -10, 0',
            correctAnswer: 'Целое число',
            xp: 5
          },
          {
            id: 'b5-2',
            type: 'card',
            question: 'float',
            code: '3.14, -0.5, 2.0',
            correctAnswer: 'Число с плавающей точкой',
            xp: 5
          },
          {
            id: 'b5-3',
            type: 'card',
            question: 'str',
            code: '"Hello", \'World\'',
            correctAnswer: 'Строка (текст)',
            xp: 5
          },
          {
            id: 'b5-4',
            type: 'card',
            question: 'bool',
            code: 'True, False',
            correctAnswer: 'Логическое значение',
            xp: 5
          },
          {
            id: 'b5-5',
            type: 'choice',
            question: 'Какой тип данных у значения 3.14?',
            options: ['int', 'float', 'str', 'bool'],
            correctAnswer: 'float',
            xp: 10
          },
          {
            id: 'b5-6',
            type: 'choice',
            question: 'Какой тип данных у значения "42"?',
            options: ['int', 'float', 'str', 'bool'],
            correctAnswer: 'str',
            explanation: 'В кавычках — всегда строка!',
            xp: 10
          },
          {
            id: 'b5-7',
            type: 'translate',
            question: 'Напиши код, который выводит тип данных числа 100',
            correctAnswer: ['print(type(100))', 'print(type(100))'],
            hint: 'Используй функцию type()',
            xp: 15
          }
        ]
      }
    ]
  },
  {
    id: 'variables',
    title: 'Переменные',
    icon: '📦',
    description: 'Создание и использование переменных',
    requiredSkills: ['basics'],
    xpReward: 120,
    lessons: [
      {
        id: 'var-1',
        title: 'Создание переменных',
        exercises: [
          {
            id: 'v1-1',
            type: 'card',
            question: 'Переменная',
            code: 'name = "Python"\nage = 30',
            correctAnswer: 'Именованное хранилище для данных',
            xp: 5
          },
          {
            id: 'v1-2',
            type: 'choice',
            question: 'Как правильно создать переменную в Python?',
            options: ['var x = 5', 'let x = 5', 'x = 5', 'int x = 5'],
            correctAnswer: 'x = 5',
            xp: 10
          },
          {
            id: 'v1-3',
            type: 'write',
            question: 'Создай переменную name со значением "CodeStreak"',
            correctAnswer: ['name = "CodeStreak"', "name = 'CodeStreak'"],
            xp: 15
          },
          {
            id: 'v1-4',
            type: 'insert',
            question: 'Дополни код создания переменной:',
            code: 'score ___ 100',
            options: ['=', '==', ':=', '->'],
            correctAnswer: '=',
            xp: 10
          },
          {
            id: 'v1-5',
            type: 'choice',
            question: 'Что выведет этот код?\nx = 10\nprint(x)',
            options: ['x', '10', '"x"', 'Ошибка'],
            correctAnswer: '10',
            xp: 10
          },
          {
            id: 'v1-6',
            type: 'fix',
            question: 'Исправь ошибку в названии переменной:',
            code: '2name = "Python"\nprint(2name)',
            correctAnswer: 'name2 = "Python"\nprint(name2)',
            xp: 15
          }
        ]
      },
      {
        id: 'var-2',
        title: 'Правила именования',
        exercises: [
          {
            id: 'v2-1',
            type: 'choice',
            question: 'Какое имя переменной НЕ валидно в Python?',
            options: ['my_var', '_private', 'var123', '123var'],
            correctAnswer: '123var',
            explanation: 'Имя не может начинаться с цифры',
            xp: 10
          },
          {
            id: 'v2-2',
            type: 'choice',
            question: 'Какой стиль именования рекомендуется в Python?',
            options: ['camelCase', 'snake_case', 'PascalCase', 'kebab-case'],
            correctAnswer: 'snake_case',
            xp: 10
          },
          {
            id: 'v2-3',
            type: 'fix',
            question: 'Исправь имя переменной на snake_case:',
            code: 'userName = "Alice"',
            correctAnswer: 'user_name = "Alice"',
            xp: 10
          },
          {
            id: 'v2-4',
            type: 'choice',
            question: 'Можно ли использовать имя "print" для переменной?',
            options: ['Да, без проблем', 'Нет, это ошибка', 'Можно, но не рекомендуется', 'Только с префиксом _'],
            correctAnswer: 'Можно, но не рекомендуется',
            explanation: 'Это перезапишет встроенную функцию',
            xp: 10
          },
          {
            id: 'v2-5',
            type: 'choice',
            question: 'Какое из этих слов НЕЛЬЗЯ использовать как имя переменной?',
            options: ['class', 'klass', 'Class', 'cls'],
            correctAnswer: 'class',
            explanation: 'class — зарезервированное слово Python',
            xp: 10
          }
        ]
      },
      {
        id: 'var-3',
        title: 'Операции с переменными',
        exercises: [
          {
            id: 'v3-1',
            type: 'choice',
            question: 'Что выведет код?\nx = 5\nx = x + 3\nprint(x)',
            options: ['5', '8', '53', 'x + 3'],
            correctAnswer: '8',
            xp: 10
          },
          {
            id: 'v3-2',
            type: 'card',
            question: 'Оператор +=',
            code: 'x = 5\nx += 3  # x = 8',
            correctAnswer: 'Сложение и присваивание',
            xp: 5
          },
          {
            id: 'v3-3',
            type: 'insert',
            question: 'Упрости запись x = x * 2:',
            code: 'x ___= 2',
            options: ['+', '-', '*', '/'],
            correctAnswer: '*',
            xp: 10
          },
          {
            id: 'v3-4',
            type: 'write',
            question: 'Создай переменную count = 0, затем увеличь её на 1 и выведи',
            correctAnswer: ['count = 0\ncount += 1\nprint(count)', 'count = 0\ncount = count + 1\nprint(count)'],
            xp: 15
          },
          {
            id: 'v3-5',
            type: 'choice',
            question: 'Что выведет код?\na = "Hello"\nb = "World"\nprint(a + " " + b)',
            options: ['HelloWorld', 'Hello World', 'a + b', 'Ошибка'],
            correctAnswer: 'Hello World',
            xp: 10
          },
          {
            id: 'v3-6',
            type: 'translate',
            question: 'Создай две переменные a=10, b=20 и выведи их сумму',
            correctAnswer: ['a = 10\nb = 20\nprint(a + b)', 'a=10\nb=20\nprint(a+b)'],
            xp: 15
          }
        ]
      },
      {
        id: 'var-4',
        title: 'f-строки',
        exercises: [
          {
            id: 'v4-1',
            type: 'card',
            question: 'f-строка',
            code: 'name = "Python"\nprint(f"Привет, {name}!")',
            correctAnswer: 'Форматированная строка с подстановкой переменных',
            xp: 5
          },
          {
            id: 'v4-2',
            type: 'choice',
            question: 'Что выведет код?\nage = 25\nprint(f"Мне {age} лет")',
            options: ['Мне age лет', 'Мне {age} лет', 'Мне 25 лет', 'Ошибка'],
            correctAnswer: 'Мне 25 лет',
            xp: 10
          },
          {
            id: 'v4-3',
            type: 'insert',
            question: 'Дополни f-строку:',
            code: 'name = "Alice"\nprint(___"Привет, {name}!")',
            options: ['f', '$', '@', ''],
            correctAnswer: 'f',
            xp: 10
          },
          {
            id: 'v4-4',
            type: 'write',
            question: 'Создай переменную language = "Python" и выведи "Я учу Python"',
            correctAnswer: ['language = "Python"\nprint(f"Я учу {language}")', 'language = "Python"\nprint("Я учу " + language)'],
            xp: 15
          },
          {
            id: 'v4-5',
            type: 'fix',
            question: 'Исправь ошибку в f-строке:',
            code: 'x = 10\nprint("Значение: {x}")',
            correctAnswer: 'x = 10\nprint(f"Значение: {x}")',
            xp: 10
          },
          {
            id: 'v4-6',
            type: 'choice',
            question: 'Что выведет код?\na = 3\nb = 4\nprint(f"{a} + {b} = {a + b}")',
            options: ['a + b = a + b', '3 + 4 = 7', '{a} + {b} = {a + b}', 'Ошибка'],
            correctAnswer: '3 + 4 = 7',
            xp: 10
          }
        ]
      },
      {
        id: 'var-5',
        title: 'input() — ввод данных',
        exercises: [
          {
            id: 'v5-1',
            type: 'card',
            question: 'input()',
            code: 'name = input("Как тебя зовут? ")',
            correctAnswer: 'Функция для получения ввода от пользователя',
            xp: 5
          },
          {
            id: 'v5-2',
            type: 'choice',
            question: 'Какой тип данных возвращает input()?',
            options: ['int', 'float', 'str', 'Зависит от ввода'],
            correctAnswer: 'str',
            explanation: 'input() всегда возвращает строку!',
            xp: 10
          },
          {
            id: 'v5-3',
            type: 'insert',
            question: 'Получи число от пользователя:',
            code: 'age = ___(input("Возраст: "))',
            options: ['int', 'str', 'float', 'num'],
            correctAnswer: 'int',
            xp: 10
          },
          {
            id: 'v5-4',
            type: 'write',
            question: 'Напиши код, который спрашивает имя и выводит "Привет, [имя]!"',
            correctAnswer: ['name = input("Имя: ")\nprint(f"Привет, {name}!")', 'name = input()\nprint("Привет, " + name + "!")'],
            xp: 15
          },
          {
            id: 'v5-5',
            type: 'fix',
            question: 'Исправь ошибку (нужно сложить числа):',
            code: 'a = input("Число 1: ")\nb = input("Число 2: ")\nprint(a + b)',
            correctAnswer: 'a = int(input("Число 1: "))\nb = int(input("Число 2: "))\nprint(a + b)',
            xp: 15
          }
        ]
      }
    ]
  },
  {
    id: 'conditions',
    title: 'Условия',
    icon: '🔀',
    description: 'if, elif, else — принятие решений в коде',
    requiredSkills: ['variables'],
    xpReward: 150,
    lessons: [
      {
        id: 'cond-1',
        title: 'if — первые условия',
        exercises: [
          {
            id: 'c1-1',
            type: 'card',
            question: 'if',
            code: 'if x > 0:\n    print("Положительное")',
            correctAnswer: 'Выполняет код, если условие истинно',
            xp: 5
          },
          {
            id: 'c1-2',
            type: 'choice',
            question: 'Что обязательно должно быть в конце строки с if?',
            options: ['Точка с запятой ;', 'Двоеточие :', 'Фигурная скобка {', 'Ничего'],
            correctAnswer: 'Двоеточие :',
            xp: 10
          },
          {
            id: 'c1-3',
            type: 'choice',
            question: 'Что выведет код?\nx = 10\nif x > 5:\n    print("Большое")',
            options: ['Большое', 'Ничего', 'Ошибка', 'x > 5'],
            correctAnswer: 'Большое',
            xp: 10
          },
          {
            id: 'c1-4',
            type: 'insert',
            question: 'Дополни условие:',
            code: 'age = 18\n___ age >= 18:\n    print("Совершеннолетний")',
            options: ['if', 'when', 'check', 'test'],
            correctAnswer: 'if',
            xp: 10
          },
          {
            id: 'c1-5',
            type: 'write',
            question: 'Напиши код: если x = 100, выведи "Сотня"',
            correctAnswer: ['x = 100\nif x == 100:\n    print("Сотня")', 'x = 100\nif x == 100: print("Сотня")'],
            xp: 15
          },
          {
            id: 'c1-6',
            type: 'fix',
            question: 'Исправь отступ:',
            code: 'if True:\nprint("Hello")',
            correctAnswer: 'if True:\n    print("Hello")',
            xp: 10
          }
        ]
      },
      {
        id: 'cond-2',
        title: 'Операторы сравнения',
        exercises: [
          {
            id: 'c2-1',
            type: 'card',
            question: '== vs =',
            code: 'x = 5    # присваивание\nx == 5   # сравнение (True)',
            correctAnswer: '= присваивает, == сравнивает',
            xp: 5
          },
          {
            id: 'c2-2',
            type: 'choice',
            question: 'Какой оператор означает "не равно"?',
            options: ['<>', '!=', '=/=', 'not='],
            correctAnswer: '!=',
            xp: 10
          },
          {
            id: 'c2-3',
            type: 'choice',
            question: 'Что вернёт выражение 10 >= 10?',
            options: ['True', 'False', '10', 'Ошибка'],
            correctAnswer: 'True',
            xp: 10
          },
          {
            id: 'c2-4',
            type: 'insert',
            question: 'Проверь, что x меньше 100:',
            code: 'if x ___ 100:\n    print("Меньше ста")',
            options: ['<', '>', '<=', '>='],
            correctAnswer: '<',
            xp: 10
          },
          {
            id: 'c2-5',
            type: 'translate',
            question: 'Напиши условие: если score больше или равно 90, выведи "Отлично"',
            correctAnswer: ['if score >= 90:\n    print("Отлично")', 'if score >= 90: print("Отлично")'],
            xp: 15
          },
          {
            id: 'c2-6',
            type: 'choice',
            question: 'Что вернёт "hello" == "Hello"?',
            options: ['True', 'False', 'Ошибка', 'hello'],
            correctAnswer: 'False',
            explanation: 'Python чувствителен к регистру!',
            xp: 10
          }
        ]
      },
      {
        id: 'cond-3',
        title: 'else — альтернатива',
        exercises: [
          {
            id: 'c3-1',
            type: 'card',
            question: 'else',
            code: 'if x > 0:\n    print("+")\nelse:\n    print("-")',
            correctAnswer: 'Выполняется, если условие if ложно',
            xp: 5
          },
          {
            id: 'c3-2',
            type: 'choice',
            question: 'Что выведет код?\nx = 3\nif x > 5:\n    print("Да")\nelse:\n    print("Нет")',
            options: ['Да', 'Нет', 'ДаНет', 'Ничего'],
            correctAnswer: 'Нет',
            xp: 10
          },
          {
            id: 'c3-3',
            type: 'insert',
            question: 'Дополни код:',
            code: 'if age >= 18:\n    print("Взрослый")\n___:\n    print("Ребёнок")',
            options: ['else', 'elif', 'otherwise', 'then'],
            correctAnswer: 'else',
            xp: 10
          },
          {
            id: 'c3-4',
            type: 'write',
            question: 'Напиши код: если число чётное — выведи "Чётное", иначе "Нечётное"',
            correctAnswer: ['if num % 2 == 0:\n    print("Чётное")\nelse:\n    print("Нечётное")'],
            hint: 'Чётное число делится на 2 без остатка',
            xp: 15
          },
          {
            id: 'c3-5',
            type: 'fix',
            question: 'Исправь ошибку:',
            code: 'if x > 0:\n    print("Плюс")\nelse\n    print("Минус")',
            correctAnswer: 'if x > 0:\n    print("Плюс")\nelse:\n    print("Минус")',
            xp: 10
          }
        ]
      },
      {
        id: 'cond-4',
        title: 'elif — множественные условия',
        exercises: [
          {
            id: 'c4-1',
            type: 'card',
            question: 'elif',
            code: 'if x > 0:\n    print("+")\nelif x < 0:\n    print("-")\nelse:\n    print("0")',
            correctAnswer: '"else if" — дополнительное условие',
            xp: 5
          },
          {
            id: 'c4-2',
            type: 'choice',
            question: 'Сколько веток elif можно использовать?',
            options: ['Только 1', 'Максимум 3', 'Сколько угодно', 'Не больше 10'],
            correctAnswer: 'Сколько угодно',
            xp: 10
          },
          {
            id: 'c4-3',
            type: 'choice',
            question: 'Что выведет код?\nscore = 75\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("C")',
            options: ['A', 'B', 'C', 'AB'],
            correctAnswer: 'B',
            xp: 10
          },
          {
            id: 'c4-4',
            type: 'translate',
            question: 'Напиши систему оценок: >=90 "Отлично", >=70 "Хорошо", иначе "Надо стараться"',
            correctAnswer: ['if score >= 90:\n    print("Отлично")\nelif score >= 70:\n    print("Хорошо")\nelse:\n    print("Надо стараться")'],
            xp: 20
          },
          {
            id: 'c4-5',
            type: 'fix',
            question: 'Исправь порядок условий (сейчас всегда "A"):',
            code: 'score = 95\nif score >= 60:\n    print("C")\nelif score >= 80:\n    print("B")\nelif score >= 90:\n    print("A")',
            correctAnswer: 'score = 95\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 60:\n    print("C")',
            xp: 15
          }
        ]
      },
      {
        id: 'cond-5',
        title: 'Логические операторы',
        exercises: [
          {
            id: 'c5-1',
            type: 'card',
            question: 'and, or, not',
            code: 'if x > 0 and x < 10:\nif a or b:\nif not finished:',
            correctAnswer: 'Логические операторы для комбинирования условий',
            xp: 5
          },
          {
            id: 'c5-2',
            type: 'choice',
            question: 'Что вернёт True and False?',
            options: ['True', 'False', 'Ошибка', 'None'],
            correctAnswer: 'False',
            xp: 10
          },
          {
            id: 'c5-3',
            type: 'choice',
            question: 'Что вернёт True or False?',
            options: ['True', 'False', 'Ошибка', 'None'],
            correctAnswer: 'True',
            xp: 10
          },
          {
            id: 'c5-4',
            type: 'insert',
            question: 'Дополни условие (возраст от 18 до 65):',
            code: 'if age >= 18 ___ age <= 65:\n    print("Рабочий возраст")',
            options: ['and', 'or', 'not', 'but'],
            correctAnswer: 'and',
            xp: 10
          },
          {
            id: 'c5-5',
            type: 'write',
            question: 'Напиши условие: если x НЕ равно 0, выведи "Не ноль"',
            correctAnswer: ['if x != 0:\n    print("Не ноль")', 'if not x == 0:\n    print("Не ноль")'],
            xp: 15
          },
          {
            id: 'c5-6',
            type: 'translate',
            question: 'Проверь: пользователь admin ИЛИ moderator — выведи "Доступ разрешён"',
            correctAnswer: ['if role == "admin" or role == "moderator":\n    print("Доступ разрешён")'],
            xp: 15
          }
        ]
      }
    ]
  },
  {
    id: 'loops',
    title: 'Циклы',
    icon: '🔄',
    description: 'for, while — повторение действий',
    requiredSkills: ['conditions'],
    xpReward: 180,
    lessons: [
      {
        id: 'loop-1',
        title: 'Цикл for',
        exercises: [
          {
            id: 'l1-1',
            type: 'card',
            question: 'for',
            code: 'for i in range(5):\n    print(i)',
            correctAnswer: 'Цикл для перебора последовательности',
            xp: 5
          },
          {
            id: 'l1-2',
            type: 'choice',
            question: 'Сколько раз выполнится цикл for i in range(3)?',
            options: ['2', '3', '4', '1'],
            correctAnswer: '3',
            xp: 10
          },
          {
            id: 'l1-3',
            type: 'choice',
            question: 'Что выведет код?\nfor i in range(3):\n    print(i)',
            options: ['0 1 2', '1 2 3', '0 1 2 3', '1 2'],
            correctAnswer: '0 1 2',
            xp: 10
          },
          {
            id: 'l1-4',
            type: 'write',
            question: 'Напиши цикл, который выводит числа от 1 до 5',
            correctAnswer: ['for i in range(1, 6):\n    print(i)'],
            xp: 15
          },
          {
            id: 'l1-5',
            type: 'insert',
            question: 'Выведи каждый символ строки:',
            code: 'word = "Python"\nfor ___ in word:\n    print(char)',
            options: ['char', 'i', 'letter', 'word'],
            correctAnswer: 'char',
            xp: 10
          }
        ]
      },
      {
        id: 'loop-2',
        title: 'range() подробнее',
        exercises: [
          {
            id: 'l2-1',
            type: 'card',
            question: 'range(start, stop, step)',
            code: 'range(5)      # 0,1,2,3,4\nrange(2, 5)   # 2,3,4\nrange(0,10,2) # 0,2,4,6,8',
            correctAnswer: 'Генерирует последовательность чисел',
            xp: 5
          },
          {
            id: 'l2-2',
            type: 'choice',
            question: 'Что создаст range(1, 10, 2)?',
            options: ['1,3,5,7,9', '1,2,3,4,5,6,7,8,9', '2,4,6,8,10', '1,10,2'],
            correctAnswer: '1,3,5,7,9',
            xp: 10
          },
          {
            id: 'l2-3',
            type: 'translate',
            question: 'Напиши цикл, который выводит чётные числа от 0 до 10',
            correctAnswer: ['for i in range(0, 11, 2):\n    print(i)', 'for i in range(0, 12, 2):\n    print(i)'],
            xp: 15
          },
          {
            id: 'l2-4',
            type: 'choice',
            question: 'Как вывести числа в обратном порядке: 5,4,3,2,1?',
            options: ['range(5, 0)', 'range(5, 0, -1)', 'range(1, 5, -1)', 'range(-5, 0)'],
            correctAnswer: 'range(5, 0, -1)',
            xp: 10
          }
        ]
      },
      {
        id: 'loop-3',
        title: 'Цикл while',
        exercises: [
          {
            id: 'l3-1',
            type: 'card',
            question: 'while',
            code: 'i = 0\nwhile i < 5:\n    print(i)\n    i += 1',
            correctAnswer: 'Цикл, пока условие истинно',
            xp: 5
          },
          {
            id: 'l3-2',
            type: 'choice',
            question: 'Когда лучше использовать while вместо for?',
            options: ['Никогда', 'Когда известно количество итераций', 'Когда условие выхода зависит от события', 'Всегда'],
            correctAnswer: 'Когда условие выхода зависит от события',
            xp: 10
          },
          {
            id: 'l3-3',
            type: 'write',
            question: 'Напиши while-цикл: пока x < 10, выводи x и увеличивай на 1',
            correctAnswer: ['x = 0\nwhile x < 10:\n    print(x)\n    x += 1'],
            xp: 15
          },
          {
            id: 'l3-4',
            type: 'fix',
            question: 'Исправь бесконечный цикл:',
            code: 'i = 0\nwhile i < 5:\n    print(i)',
            correctAnswer: 'i = 0\nwhile i < 5:\n    print(i)\n    i += 1',
            xp: 15
          }
        ]
      },
      {
        id: 'loop-4',
        title: 'break и continue',
        exercises: [
          {
            id: 'l4-1',
            type: 'card',
            question: 'break',
            code: 'for i in range(10):\n    if i == 5:\n        break\n    print(i)',
            correctAnswer: 'Немедленно выходит из цикла',
            xp: 5
          },
          {
            id: 'l4-2',
            type: 'card',
            question: 'continue',
            code: 'for i in range(5):\n    if i == 2:\n        continue\n    print(i)',
            correctAnswer: 'Пропускает текущую итерацию',
            xp: 5
          },
          {
            id: 'l4-3',
            type: 'choice',
            question: 'Что выведет код?\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)',
            options: ['0 1 2', '0 1 2 3', '0 1 2 4', '3'],
            correctAnswer: '0 1 2',
            xp: 10
          },
          {
            id: 'l4-4',
            type: 'choice',
            question: 'Что выведет код?\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)',
            options: ['0 1 3 4', '0 1 2 3 4', '0 1', '2'],
            correctAnswer: '0 1 3 4',
            xp: 10
          },
          {
            id: 'l4-5',
            type: 'translate',
            question: 'Напиши цикл: выводи числа от 1 до 100, но остановись, если число делится на 7',
            correctAnswer: ['for i in range(1, 101):\n    if i % 7 == 0:\n        break\n    print(i)'],
            xp: 20
          }
        ]
      }
    ]
  },
  {
    id: 'functions',
    title: 'Функции',
    icon: '⚡',
    description: 'def, return, аргументы',
    requiredSkills: ['loops'],
    xpReward: 200,
    lessons: [
      {
        id: 'func-1',
        title: 'Первые функции',
        exercises: [
          {
            id: 'f1-1',
            type: 'card',
            question: 'def',
            code: 'def say_hello():\n    print("Привет!")\n\nsay_hello()',
            correctAnswer: 'Ключевое слово для создания функции',
            xp: 5
          },
          {
            id: 'f1-2',
            type: 'choice',
            question: 'Как правильно объявить функцию?',
            options: ['function greet():', 'def greet():', 'func greet():', 'define greet():'],
            correctAnswer: 'def greet():',
            xp: 10
          },
          {
            id: 'f1-3',
            type: 'write',
            question: 'Создай функцию hello(), которая выводит "Hello, World!"',
            correctAnswer: ['def hello():\n    print("Hello, World!")'],
            xp: 15
          },
          {
            id: 'f1-4',
            type: 'insert',
            question: 'Вызови функцию:',
            code: 'def greet():\n    print("Hi!")\n\n___()',
            options: ['greet', 'call greet', 'run greet', 'execute greet'],
            correctAnswer: 'greet',
            xp: 10
          }
        ]
      },
      {
        id: 'func-2',
        title: 'Аргументы',
        exercises: [
          {
            id: 'f2-1',
            type: 'card',
            question: 'Аргументы функции',
            code: 'def greet(name):\n    print(f"Привет, {name}!")\n\ngreet("Алиса")',
            correctAnswer: 'Данные, передаваемые в функцию',
            xp: 5
          },
          {
            id: 'f2-2',
            type: 'choice',
            question: 'Что выведет код?\ndef double(x):\n    print(x * 2)\n\ndouble(5)',
            options: ['5', '10', 'x * 2', 'Ошибка'],
            correctAnswer: '10',
            xp: 10
          },
          {
            id: 'f2-3',
            type: 'write',
            question: 'Создай функцию add(a, b), которая выводит сумму a и b',
            correctAnswer: ['def add(a, b):\n    print(a + b)'],
            xp: 15
          },
          {
            id: 'f2-4',
            type: 'fix',
            question: 'Исправь ошибку:',
            code: 'def greet(name):\n    print(f"Hi, {name}!")\n\ngreet()',
            correctAnswer: 'def greet(name):\n    print(f"Hi, {name}!")\n\ngreet("User")',
            xp: 10
          }
        ]
      },
      {
        id: 'func-3',
        title: 'return — возврат значения',
        exercises: [
          {
            id: 'f3-1',
            type: 'card',
            question: 'return',
            code: 'def square(x):\n    return x ** 2\n\nresult = square(4)  # 16',
            correctAnswer: 'Возвращает значение из функции',
            xp: 5
          },
          {
            id: 'f3-2',
            type: 'choice',
            question: 'Что вернёт функция без return?',
            options: ['0', 'None', 'Ошибка', 'Пустую строку'],
            correctAnswer: 'None',
            xp: 10
          },
          {
            id: 'f3-3',
            type: 'translate',
            question: 'Напиши функцию is_even(n), которая возвращает True если число чётное',
            correctAnswer: ['def is_even(n):\n    return n % 2 == 0'],
            xp: 20
          },
          {
            id: 'f3-4',
            type: 'choice',
            question: 'Что выведет код?\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3) * 2)',
            options: ['5', '10', '2 + 3 * 2', 'Ошибка'],
            correctAnswer: '10',
            xp: 10
          }
        ]
      }
    ]
  },
  {
    id: 'lists',
    title: 'Списки',
    icon: '📋',
    description: 'Массивы данных в Python',
    requiredSkills: ['functions'],
    xpReward: 180,
    lessons: [
      {
        id: 'list-1',
        title: 'Создание списков',
        exercises: [
          {
            id: 'li1-1',
            type: 'card',
            question: 'list',
            code: 'nums = [1, 2, 3]\nnames = ["Анна", "Борис"]',
            correctAnswer: 'Упорядоченная коллекция элементов',
            xp: 5
          },
          {
            id: 'li1-2',
            type: 'choice',
            question: 'Как создать пустой список?',
            options: ['list = {}', 'list = []', 'list = ()', 'list = ""'],
            correctAnswer: 'list = []',
            xp: 10
          },
          {
            id: 'li1-3',
            type: 'write',
            question: 'Создай список fruits с элементами "яблоко", "банан", "апельсин"',
            correctAnswer: ['fruits = ["яблоко", "банан", "апельсин"]', "fruits = ['яблоко', 'банан', 'апельсин']"],
            xp: 15
          }
        ]
      },
      {
        id: 'list-2',
        title: 'Индексация',
        exercises: [
          {
            id: 'li2-1',
            type: 'choice',
            question: 'Какой индекс у первого элемента списка?',
            options: ['1', '0', '-1', 'first'],
            correctAnswer: '0',
            xp: 10
          },
          {
            id: 'li2-2',
            type: 'choice',
            question: 'Что выведет код?\nnums = [10, 20, 30]\nprint(nums[-1])',
            options: ['10', '20', '30', 'Ошибка'],
            correctAnswer: '30',
            explanation: '-1 — последний элемент',
            xp: 10
          },
          {
            id: 'li2-3',
            type: 'insert',
            question: 'Получи второй элемент:',
            code: 'colors = ["red", "green", "blue"]\nprint(colors[___])',
            options: ['0', '1', '2', 'second'],
            correctAnswer: '1',
            xp: 10
          }
        ]
      }
    ]
  },
  {
    id: 'dictionaries',
    title: 'Словари',
    icon: '📖',
    description: 'Ключ-значение пары',
    requiredSkills: ['lists'],
    xpReward: 180,
    lessons: []
  },
  {
    id: 'oop',
    title: 'ООП',
    icon: '🏗️',
    description: 'Классы и объекты',
    requiredSkills: ['dictionaries'],
    xpReward: 250,
    lessons: []
  },
  {
    id: 'files',
    title: 'Файлы',
    icon: '📁',
    description: 'Чтение и запись файлов',
    requiredSkills: ['oop'],
    xpReward: 150,
    lessons: []
  },
  {
    id: 'modules',
    title: 'Модули',
    icon: '📦',
    description: 'import, pip, стандартная библиотека',
    requiredSkills: ['files'],
    xpReward: 180,
    lessons: []
  },
  {
    id: 'errors',
    title: 'Ошибки',
    icon: '🐛',
    description: 'try, except, обработка исключений',
    requiredSkills: ['modules'],
    xpReward: 200,
    lessons: []
  }
];

export const projects: Project[] = [
  {
    id: 'project-rps',
    title: 'Камень-Ножницы-Бумага',
    description: 'Создай классическую игру против компьютера',
    icon: '✊',
    requiredSkills: ['conditions', 'functions'],
    xpReward: 500,
    starterCode: `import random

def play_game():
    choices = ["камень", "ножницы", "бумага"]
    
    # Получи выбор пользователя
    # Сгенерируй выбор компьютера
    # Определи победителя
    
    pass

play_game()`,
    solution: `import random

def play_game():
    choices = ["камень", "ножницы", "бумага"]
    user = input("Выбери (камень/ножницы/бумага): ").lower()
    computer = random.choice(choices)
    
    print(f"Компьютер выбрал: {computer}")
    
    if user == computer:
        print("Ничья!")
    elif (user == "камень" and computer == "ножницы") or \\
         (user == "ножницы" and computer == "бумага") or \\
         (user == "бумага" and computer == "камень"):
        print("Ты победил! 🎉")
    else:
        print("Компьютер победил 😢")

play_game()`,
    tests: ['камень beats ножницы', 'ножницы beats бумага', 'бумага beats камень']
  },
  {
    id: 'project-guessing',
    title: 'Угадай число',
    description: 'Игра "Угадай число от 1 до 100"',
    icon: '🎯',
    requiredSkills: ['loops', 'conditions'],
    xpReward: 400,
    starterCode: `import random

secret = random.randint(1, 100)
attempts = 0

# Создай цикл для угадывания
# Давай подсказки "больше" или "меньше"
# Считай количество попыток`,
    solution: `import random

secret = random.randint(1, 100)
attempts = 0

print("Угадай число от 1 до 100!")

while True:
    guess = int(input("Твоя догадка: "))
    attempts += 1
    
    if guess < secret:
        print("Больше!")
    elif guess > secret:
        print("Меньше!")
    else:
        print(f"Верно! Ты угадал за {attempts} попыток! 🎉")
        break`,
    tests: ['game ends on correct guess', 'hints work correctly']
  },
  {
    id: 'project-todo',
    title: 'To-Do List',
    description: 'Приложение для управления задачами',
    icon: '✅',
    requiredSkills: ['lists', 'functions'],
    xpReward: 600,
    starterCode: `tasks = []

def add_task(task):
    # Добавь задачу в список
    pass

def show_tasks():
    # Покажи все задачи
    pass

def complete_task(index):
    # Отметь задачу как выполненную
    pass

# Создай меню для управления задачами`,
    solution: `tasks = []

def add_task(task):
    tasks.append({"text": task, "done": False})
    print(f"✅ Задача добавлена: {task}")

def show_tasks():
    if not tasks:
        print("Список пуст!")
        return
    for i, task in enumerate(tasks):
        status = "✅" if task["done"] else "⬜"
        print(f"{i+1}. {status} {task['text']}")

def complete_task(index):
    if 0 <= index < len(tasks):
        tasks[index]["done"] = True
        print(f"Задача выполнена!")

while True:
    print("\\n1. Добавить  2. Показать  3. Выполнить  4. Выход")
    choice = input("Выбор: ")
    if choice == "1":
        add_task(input("Задача: "))
    elif choice == "2":
        show_tasks()
    elif choice == "3":
        complete_task(int(input("Номер: ")) - 1)
    elif choice == "4":
        break`,
    tests: ['add task works', 'show tasks works', 'complete task works']
  }
];

export const achievements = [
  { id: 'first-lesson', title: 'Первый шаг', description: 'Пройди первый урок', icon: '👶', xp: 50, rarity: 'common' },
  { id: 'streak-7', title: 'Неделя огня', description: '7 дней подряд', icon: '🔥', xp: 100, rarity: 'common' },
  { id: 'streak-30', title: 'Месяц мощи', description: '30 дней подряд', icon: '💪', xp: 300, rarity: 'rare' },
  { id: 'streak-100', title: 'Легенда стрика', description: '100 дней подряд', icon: '👑', xp: 1000, rarity: 'legendary' },
  { id: 'streak-365', title: 'Год без пропусков', description: '365 дней подряд', icon: '🏆', xp: 5000, rarity: 'mythic' },
  { id: 'perfect-lesson', title: 'Перфекционист', description: 'Урок без ошибок', icon: '💯', xp: 50, rarity: 'common' },
  { id: 'perfect-10', title: 'Безупречный', description: '10 уроков без ошибок', icon: '⭐', xp: 200, rarity: 'rare' },
  { id: 'night-owl', title: 'Ночной кодер', description: 'Урок после полуночи', icon: '🦉', xp: 50, rarity: 'common' },
  { id: 'night-10', title: 'Ночной багфиксер', description: '10 уроков после полуночи', icon: '🌙', xp: 150, rarity: 'rare' },
  { id: 'early-bird', title: 'Ранняя пташка', description: 'Урок до 7 утра', icon: '🐦', xp: 50, rarity: 'common' },
  { id: 'speed-demon', title: 'Скоростной демон', description: 'Урок за 2 минуты', icon: '⚡', xp: 100, rarity: 'rare' },
  { id: 'first-skill', title: 'Первый скилл', description: 'Заверши первый навык', icon: '🎯', xp: 100, rarity: 'common' },
  { id: 'python-basics', title: 'Python Падаван', description: 'Заверши основы Python', icon: '🐍', xp: 200, rarity: 'rare' },
  { id: 'python-ninja', title: 'Python Ninja', description: 'Пройди все уровни Python', icon: '🥷', xp: 1000, rarity: 'legendary' },
  { id: 'first-project', title: 'Первый проект', description: 'Заверши первый проект', icon: '🚀', xp: 200, rarity: 'rare' },
  { id: 'bug-hunter', title: 'Охотник на баги', description: 'Исправь 50 ошибок', icon: '🐛', xp: 150, rarity: 'rare' },
  { id: 'code-master', title: 'Мастер кода', description: 'Напиши 100 решений', icon: '💻', xp: 300, rarity: 'epic' },
  { id: 'xp-1000', title: 'XP Маньяк', description: 'Набери 1000 XP', icon: '💎', xp: 100, rarity: 'common' },
  { id: 'xp-10000', title: 'XP Легенда', description: 'Набери 10000 XP', icon: '👾', xp: 500, rarity: 'epic' },
  { id: 'gem-collector', title: 'Коллекционер гемов', description: 'Собери 1000 гемов', icon: '💠', xp: 200, rarity: 'rare' },
  { id: 'social-butterfly', title: 'Душа компании', description: 'Добавь 10 друзей', icon: '🦋', xp: 100, rarity: 'common' },
  { id: 'clan-founder', title: 'Основатель клана', description: 'Создай клан', icon: '🏰', xp: 300, rarity: 'epic' },
  { id: 'duel-winner', title: 'Дуэлянт', description: 'Победи в первой дуэли', icon: '⚔️', xp: 100, rarity: 'common' },
  { id: 'duel-champion', title: 'Чемпион дуэлей', description: 'Выиграй 50 дуэлей', icon: '🏅', xp: 500, rarity: 'legendary' },
  { id: 'battle-pass', title: 'Боец сезона', description: 'Заверши Battle Pass', icon: '🎖️', xp: 1000, rarity: 'legendary' }
];

export const shopItems = [
  { id: 'streak-freeze', title: 'Streak Freeze', description: 'Защити серию на 1 день', price: 200, icon: '🧊', type: 'consumable' },
  { id: 'double-xp', title: 'Двойной XP', description: '2x XP на 24 часа', price: 300, icon: '⚡', type: 'consumable' },
  { id: 'heart-refill', title: 'Восстановление ❤️', description: 'Все сердца', price: 350, icon: '💗', type: 'consumable' },
  { id: 'avatar-hacker', title: 'Аватар "Хакер"', description: 'Крутой аватар', price: 500, icon: '👨‍💻', type: 'avatar' },
  { id: 'avatar-ninja', title: 'Аватар "Ниндзя"', description: 'Скрытный стиль', price: 500, icon: '🥷', type: 'avatar' },
  { id: 'avatar-robot', title: 'Аватар "Робот"', description: 'Машинный разум', price: 750, icon: '🤖', type: 'avatar' },
  { id: 'pet-cat', title: 'Питомец "Кот"', description: 'Пиксельный котик', price: 1000, icon: '🐱', type: 'pet' },
  { id: 'pet-dragon', title: 'Питомец "Дракон"', description: 'Огненный компаньон', price: 2000, icon: '🐉', type: 'pet' },
  { id: 'theme-matrix', title: 'Тема "Matrix"', description: 'Зелёный код', price: 800, icon: '💚', type: 'theme' },
  { id: 'theme-cyberpunk', title: 'Тема "Cyberpunk"', description: 'Неоновый стиль', price: 800, icon: '💜', type: 'theme' },
  { id: 'theme-dracula', title: 'Тема "Dracula"', description: 'Тёмная элегантность', price: 600, icon: '🧛', type: 'theme' },
  { id: 'frame-gold', title: 'Золотая рамка', description: 'Блестящий профиль', price: 1500, icon: '🖼️', type: 'frame' }
];
