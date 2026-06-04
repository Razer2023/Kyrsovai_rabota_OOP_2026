var AVAILABLE_LANGUAGES = [
    { id: "python", name: "Python", icon: "🐍", color: "#3776AB", desc: "Самый популярный язык", available: true },
    { id: "javascript", name: "JavaScript", icon: "🟨", color: "#F7DF1E", desc: "Язык веб-разработки", available: true },
    { id: "html", name: "HTML/CSS", icon: "🌐", color: "#E34F26", desc: "Основы веб-страниц", available: true },
    { id: "sql", name: "SQL", icon: "🗄️", color: "#4479A1", desc: "Базы данных", available: true },
    { id: "go", name: "Go", icon: "🐹", color: "#00ADD8", desc: "Язык от Google", available: true },
    { id: "rust", name: "Rust", icon: "🦀", color: "#CE422B", desc: "Системный язык", available: true }
];

var PRACTICE_SKILLS = [
    { id:"practice_calc", title:"Калькулятор", icon:"🧮", desc:"Математика", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"pc1", title:"Арифметика", exercises:[
            { id:"pc1-1", type:"write", q:"Выведи сумму 125 + 375", answer:"print(125 + 375)", xp:15 },
            { id:"pc1-2", type:"write", q:"Вычисли площадь 15 * 8", answer:"print(15 * 8)", xp:15 },
            { id:"pc1-3", type:"write", q:"Раздели 100 на 7 (целая часть)", answer:"print(100 // 7)", xp:15 },
            { id:"pc1-4", type:"write", q:"Вычисли 2 в степени 10", answer:"print(2 ** 10)", xp:15 },
            { id:"pc1-5", type:"write", q:"Остаток от деления 17 на 5", answer:"print(17 % 5)", xp:15 },
            { id:"pc1-6", type:"write", q:"Вычисли (10 + 5) * 3", answer:"print((10 + 5) * 3)", xp:15 },
            { id:"pc1-7", type:"write", q:"Вычисли корень из 144 (** 0.5)", answer:"print(144 ** 0.5)", xp:20 },
            { id:"pc1-8", type:"write", q:"Переведи 100 минут в часы и минуты", answer:"print(100 // 60, 100 % 60)", xp:20 }
        ]}
    ]},
    { id:"practice_strings", title:"Строки", icon:"📝", desc:"Работа с текстом", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"ps1", title:"Операции", exercises:[
            { id:"ps1-1", type:"write", q:"Выведи Python 5 раз подряд", answer:'print("Python" * 5)', xp:15 },
            { id:"ps1-2", type:"write", q:"Выведи длину строки Hello", answer:'print(len("Hello"))', xp:15 },
            { id:"ps1-3", type:"write", q:"Выведи Python задом наперёд", answer:'print("Python"[::-1])', xp:20 },
            { id:"ps1-4", type:"write", q:"Выведи первые 3 буквы слова Python", answer:'print("Python"[:3])', xp:15 },
            { id:"ps1-5", type:"write", q:"Переведи hello в верхний регистр", answer:'print("hello".upper())', xp:15 },
            { id:"ps1-6", type:"write", q:"Замени a на o в слове banana", answer:'print("banana".replace("a", "o"))', xp:20 },
            { id:"ps1-7", type:"write", q:"Проверь что Hello начинается с H", answer:'print("Hello".startswith("H"))', xp:20 },
            { id:"ps1-8", type:"write", q:"Раздели строку a,b,c по запятой", answer:'print("a,b,c".split(","))', xp:20 }
        ]}
    ]},
    { id:"practice_vars", title:"Переменные", icon:"📦", desc:"Работа с переменными", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"pv1", title:"Создание", exercises:[
            { id:"pv1-1", type:"write", q:"Создай age = 25 и выведи", answer:"age = 25\nprint(age)", xp:15 },
            { id:"pv1-2", type:"write", q:"Создай x=10, y=20, выведи сумму", answer:"x = 10\ny = 20\nprint(x + y)", xp:15 },
            { id:"pv1-3", type:"write", q:"Создай name = Alice и выведи приветствие", answer:'name = "Alice"\nprint("Hello, " + name)', xp:15 },
            { id:"pv1-4", type:"write", q:"Поменяй местами x=5 и y=10", answer:"x = 5\ny = 10\nx, y = y, x\nprint(x, y)", xp:20 },
            { id:"pv1-5", type:"write", q:"Создай pi = 3.14 и выведи тип", answer:"pi = 3.14\nprint(type(pi))", xp:15 },
            { id:"pv1-6", type:"write", q:"Конвертируй строку 42 в число", answer:'x = int("42")\nprint(x)', xp:15 }
        ]}
    ]},
    { id:"practice_cond", title:"Условия", icon:"🔀", desc:"if/else", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"pco1", title:"Практика", exercises:[
            { id:"pco1-1", type:"write", q:"Проверь чётность числа 17", answer:"print(17 % 2 == 0)", xp:15 },
            { id:"pco1-2", type:"write", q:'Если x>10, выведи Большое', answer:'x = 15\nif x > 10:\n    print("Большое")', xp:20 },
            { id:"pco1-3", type:"write", q:"Найди максимум из a=5 и b=8", answer:"a = 5\nb = 8\nprint(max(a, b))", xp:15 },
            { id:"pco1-4", type:"write", q:'Проверь что строка "hello" не пустая', answer:'s = "hello"\nif s:\n    print("Не пустая")', xp:20 },
            { id:"pco1-5", type:"write", q:"Проверь что число в диапазоне 1-100", answer:'x = 50\nif 1 <= x <= 100:\n    print("В диапазоне")', xp:20 }
        ]}
    ]},
    { id:"practice_loops", title:"Циклы", icon:"🔄", desc:"for и while", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"pl1", title:"Практика", exercises:[
            { id:"pl1-1", type:"write", q:"Выведи числа от 1 до 5", answer:"for i in range(1, 6):\n    print(i)", xp:15 },
            { id:"pl1-2", type:"write", q:"Выведи чётные от 2 до 10", answer:"for i in range(2, 11, 2):\n    print(i)", xp:20 },
            { id:"pl1-3", type:"write", q:"Посчитай сумму от 1 до 100", answer:"total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)", xp:20 },
            { id:"pl1-4", type:"write", q:"Выведи таблицу умножения на 5", answer:"for i in range(1, 11):\n    print(5 * i)", xp:20 },
            { id:"pl1-5", type:"write", q:"Найди все делители числа 24", answer:"for i in range(1, 25):\n    if 24 % i == 0:\n        print(i)", xp:25 }
        ]}
    ]},
    { id:"practice_func", title:"Функции", icon:"⚡", desc:"def/return", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"pf1", title:"Практика", exercises:[
            { id:"pf1-1", type:"write", q:"Функция square(n) возвращает n в квадрате", answer:"def square(n):\n    return n ** 2", xp:20 },
            { id:"pf1-2", type:"write", q:"Функция is_even(n) - True если чётное", answer:"def is_even(n):\n    return n % 2 == 0", xp:20 },
            { id:"pf1-3", type:"write", q:"Функция max_of_three(a,b,c) - максимум из трёх", answer:"def max_of_three(a, b, c):\n    return max(a, b, c)", xp:25 },
            { id:"pf1-4", type:"write", q:"Функция celsius_to_fahrenheit(c)", answer:"def celsius_to_fahrenheit(c):\n    return c * 9 / 5 + 32", xp:25 },
            { id:"pf1-5", type:"write", q:"Функция count_vowels(s) считает гласные", answer:'def count_vowels(s):\n    return sum(1 for c in s.lower() if c in "aeiou")', xp:30 }
        ]}
    ]},
    { id:"practice_lists", title:"Списки", icon:"📋", desc:"Работа со списками", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"pli1", title:"Практика", exercises:[
            { id:"pli1-1", type:"write", q:"Создай [1,2,3,4,5] и выведи сумму", answer:"nums = [1, 2, 3, 4, 5]\nprint(sum(nums))", xp:15 },
            { id:"pli1-2", type:"write", q:"Список квадратов от 1 до 5", answer:"nums = [x**2 for x in range(1, 6)]\nprint(nums)", xp:20 },
            { id:"pli1-3", type:"write", q:"Отсортируй [3,1,4,1,5] по убыванию", answer:"nums = [3, 1, 4, 1, 5]\nnums.sort(reverse=True)\nprint(nums)", xp:20 },
            { id:"pli1-4", type:"write", q:"Найди уникальные элементы в [1,2,2,3,3,3]", answer:"nums = [1, 2, 2, 3, 3, 3]\nprint(list(set(nums)))", xp:25 },
            { id:"pli1-5", type:"write", q:"Объедини два списка [1,2] и [3,4]", answer:"a = [1, 2]\nb = [3, 4]\nprint(a + b)", xp:15 }
        ]}
    ]},
    { id:"practice_dicts", title:"Словари", icon:"📖", desc:"Словари", alwaysOpen:true, color:"#10B981", lessons:[
        { id:"pd1", title:"Практика", exercises:[
            { id:"pd1-1", type:"write", q:'Создай словарь {"name": "Alice", "age": 25}', answer:'person = {"name": "Alice", "age": 25}\nprint(person)', xp:15 },
            { id:"pd1-2", type:"write", q:"Получи name из person", answer:'person = {"name": "Alice", "age": 25}\nprint(person["name"])', xp:15 },
            { id:"pd1-3", type:"write", q:"Подсчитай буквы в слове hello", answer:'word = "hello"\ncounts = {}\nfor c in word:\n    counts[c] = counts.get(c, 0) + 1\nprint(counts)', xp:30 },
            { id:"pd1-4", type:"write", q:"Объедини два словаря", answer:'a = {"x": 1}\nb = {"y": 2}\na.update(b)\nprint(a)', xp:20 },
            { id:"pd1-5", type:"write", q:"Получи все ключи словаря", answer:'d = {"a": 1, "b": 2}\nprint(list(d.keys()))', xp:15 }
        ]}
    ]},
    { id:"practice_challenges", title:"Челленджи", icon:"🏆", desc:"Алгоритмы", alwaysOpen:true, color:"#F59E0B", lessons:[
        { id:"pch1", title:"Алгоритмы", exercises:[
            { id:"pch1-1", type:"write", q:"Функция is_palindrome(s) - палиндром?", answer:"def is_palindrome(s):\n    return s == s[::-1]", xp:25 },
            { id:"pch1-2", type:"write", q:"Функция factorial(n)", answer:"def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)", xp:30 },
            { id:"pch1-3", type:"write", q:"FizzBuzz для числа n", answer:'def fizzbuzz(n):\n    if n % 15 == 0:\n        return "FizzBuzz"\n    elif n % 3 == 0:\n        return "Fizz"\n    elif n % 5 == 0:\n        return "Buzz"\n    return str(n)', xp:35 },
            { id:"pch1-4", type:"write", q:"Функция fibonacci(n) - n-ое число Фибоначчи", answer:"def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a", xp:35 },
            { id:"pch1-5", type:"write", q:"Функция is_prime(n) - простое ли число", answer:"def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True", xp:40 },
            { id:"pch1-6", type:"write", q:"Функция reverse_words(s) - слова наоборот", answer:'def reverse_words(s):\n    return " ".join(s.split()[::-1])', xp:30 }
        ]}
    ]}
];

var COURSE_SKILLS = [
    { id:"basics", title:"Основы", icon:"🐣", desc:"print, комментарии, типы", req:[], lessons:[
        { id:"b1", title:"Привет, мир!", exercises:[
            { id:"b1-t1", type:"theory", q:"Что такое Python?", text:"Python — простой и мощный язык программирования. Его используют в Google, Netflix, NASA и тысячах компаний." },
            { id:"b1-t2", type:"theory", q:"Функция print()", text:"print() выводит текст на экран. Текст пишется в кавычках.", code:'print("Hello, World!")' },
            { id:"b1-t3", type:"theory", q:"Кавычки", text:"Можно использовать одинарные или двойные кавычки.", code:"print('Hello')\nprint(\"Hello\")" },
            { id:"b1-1", type:"choice", q:"Какая функция выводит текст?", opts:["echo()","print()","console.log()","printf()"], answer:"print()", xp:10 },
            { id:"b1-2", type:"insert", q:'Вставь: ___("Hello")', opts:["print","echo","say","write"], answer:"print", xp:10 },
            { id:"b1-3", type:"write", q:'Выведи "Hello"', answer:'print("Hello")', xp:15 },
            { id:"b1-4", type:"fix", q:"Исправь ошибку:", code:'prnt("Hello")', answer:'print("Hello")', xp:15 },
            { id:"b1-5", type:"choice", q:'print("Hi") print("Bye") — что будет?', opts:["HiBye","Hi Bye","Ошибка","Hi\\nBye"], answer:"Hi\\nBye", xp:10 }
        ]},
        { id:"b2", title:"Числа и математика", exercises:[
            { id:"b2-t1", type:"theory", q:"Математика в Python", text:"Python умеет: + сложение, - вычитание, * умножение, / деление" },
            { id:"b2-t2", type:"theory", q:"Степень и остаток", text:"** — степень, // — целая часть деления, % — остаток", code:"print(2 ** 3)   # 8\nprint(17 // 5)  # 3\nprint(17 % 5)   # 2" },
            { id:"b2-1", type:"choice", q:"Что выведет print(5+3)?", opts:["53","8","5+3","Ошибка"], answer:"8", xp:10 },
            { id:"b2-2", type:"insert", q:"Дополни: print(10 ___ 2) чтобы получить 20", opts:["+","-","*","/"], answer:"*", xp:10 },
            { id:"b2-3", type:"write", q:"Выведи 2 в степени 10", answer:"print(2**10)", xp:15 },
            { id:"b2-4", type:"choice", q:"Что делает **?", opts:["Умножение","Степень","Комментарий","Деление"], answer:"Степень", xp:10 },
            { id:"b2-5", type:"fix", q:"Исправь:", code:"print(10 / / 3)", answer:"print(10 // 3)", xp:15 },
            { id:"b2-6", type:"choice", q:"7 % 3 равно?", opts:["2","1","3","0"], answer:"1", xp:10 }
        ]},
        { id:"b3", title:"Строки", exercises:[
            { id:"b3-t1", type:"theory", q:"Что такое строка?", text:"Строка (string) — это текст в кавычках: одинарных или двойных." },
            { id:"b3-t2", type:"theory", q:"Операции со строками", text:"Строки можно складывать (+) и умножать (*) на число!", code:'print("Привет" + " " + "мир!")  # Привет мир!\nprint("Ха" * 3)  # ХаХаХа' },
            { id:"b3-1", type:"choice", q:'print("Ha" * 3) выведет?', opts:["Ha3","HaHaHa","Ha * 3","Ошибка"], answer:"HaHaHa", xp:10 },
            { id:"b3-2", type:"write", q:'Выведи "Python"', answer:'print("Python")', xp:15 },
            { id:"b3-3", type:"choice", q:'print("A" + "B") выведет?', opts:["AB","A B","A+B","Ошибка"], answer:"AB", xp:10 },
            { id:"b3-4", type:"write", q:'Соедини "Hello" и " World"', answer:'print("Hello" + " World")', xp:15 },
            { id:"b3-5", type:"choice", q:'len("Python") вернёт?', opts:["5","6","7","Ошибка"], answer:"6", xp:10 }
        ]},
        { id:"b4", title:"Комментарии", exercises:[
            { id:"b4-t1", type:"theory", q:"Комментарии", text:"Комментарии — заметки для программиста. Python их игнорирует. Используй # для комментария.", code:'# Это комментарий\nprint("Hello")  # Это тоже' },
            { id:"b4-1", type:"choice", q:"Как написать комментарий?", opts:["// текст","# текст","/* текст */","-- текст"], answer:"# текст", xp:10 },
            { id:"b4-2", type:"insert", q:"___ Это комментарий", opts:["#","//","/*","--"], answer:"#", xp:10 },
            { id:"b4-3", type:"write", q:'Напиши комментарий "Привет"', answer:"# Привет", xp:15 },
            { id:"b4-4", type:"choice", q:"# print('Hi') — что произойдёт?", opts:["Выведет Hi","Ничего","Ошибка","Выведет #"], answer:"Ничего", xp:10 }
        ]},
        { id:"b5", title:"Ввод данных", exercises:[
            { id:"b5-t1", type:"theory", q:"Функция input()", text:"input() позволяет пользователю вводить данные. Всегда возвращает строку!", code:'name = input("Как тебя зовут? ")\nprint("Привет, " + name + "!")' },
            { id:"b5-1", type:"choice", q:"Что делает input()?", opts:["Выводит текст","Получает ввод","Создаёт файл","Вычисляет"], answer:"Получает ввод", xp:10 },
            { id:"b5-2", type:"insert", q:'name = ___("Имя: ")', opts:["input","print","read","get"], answer:"input", xp:10 },
            { id:"b5-3", type:"write", q:"Спроси имя пользователя", answer:'name = input("Имя: ")', xp:15 },
            { id:"b5-4", type:"choice", q:"input() всегда возвращает?", opts:["int","float","str","bool"], answer:"str", xp:10 },
            { id:"b5-5", type:"fix", q:"Исправь:", code:'age = input("Возраст: ")\nprint(age + 1)', answer:'age = int(input("Возраст: "))\nprint(age + 1)', xp:20 }
        ]}
    ]},

    { id:"variables", title:"Переменные", icon:"📦", desc:"Создание и типы", req:["basics"], lessons:[
        { id:"v1", title:"Создание переменных", exercises:[
            { id:"v1-t1", type:"theory", q:"Что такое переменная?", text:"Переменная — имя, которое хранит значение. Как коробка с наклейкой." },
            { id:"v1-t2", type:"theory", q:"Создание переменной", text:"Используй = для присваивания. Имя слева, значение справа.", code:'age = 25\nname = "Python"\npi = 3.14\nprint(age)  # 25' },
            { id:"v1-1", type:"choice", q:"Как создать переменную?", opts:["var x=5","let x=5","x=5","int x=5"], answer:"x=5", xp:10 },
            { id:"v1-2", type:"write", q:"Создай переменную age = 25", answer:"age = 25", xp:15 },
            { id:"v1-3", type:"choice", q:"x=10; print(x) выведет?", opts:["x","10","\"x\"","Ошибка"], answer:"10", xp:10 },
            { id:"v1-4", type:"choice", q:"Какое имя НЕ допустимо?", opts:["my_var","_private","2fast","name"], answer:"2fast", xp:10 },
            { id:"v1-5", type:"write", q:"Создай x=5, y=10 и выведи их сумму", answer:"x = 5\ny = 10\nprint(x + y)", xp:15 },
            { id:"v1-6", type:"fix", q:"Исправь:", code:"my-var = 10", answer:"my_var = 10", xp:15 }
        ]},
        { id:"v2", title:"Типы данных", exercises:[
            { id:"v2-t1", type:"theory", q:"Типы данных", text:"int — целые числа (42)\nfloat — дробные (3.14)\nstr — строки (\"текст\")\nbool — True или False", code:'x = 42        # int\ny = 3.14      # float\nname = "Bob"  # str\nis_ok = True  # bool' },
            { id:"v2-1", type:"choice", q:"Какой тип у 3.14?", opts:["int","float","str","double"], answer:"float", xp:10 },
            { id:"v2-2", type:"choice", q:'Какой тип у "123"?', opts:["int","float","str","number"], answer:"str", xp:10 },
            { id:"v2-3", type:"choice", q:"type(True) вернёт?", opts:["int","str","bool","true"], answer:"bool", xp:10 },
            { id:"v2-4", type:"write", q:"Узнай тип переменной x = 3.14", answer:"x = 3.14\nprint(type(x))", xp:15 },
            { id:"v2-5", type:"choice", q:"type(42)?", opts:["int","float","number","integer"], answer:"int", xp:10 }
        ]},
        { id:"v3", title:"Преобразование типов", exercises:[
            { id:"v3-t1", type:"theory", q:"Преобразование типов", text:"int() — в целое число\nfloat() — в дробное\nstr() — в строку", code:'int("42")    # 42\nfloat("3.14") # 3.14\nstr(100)     # "100"' },
            { id:"v3-1", type:"choice", q:'int("42") вернёт?', opts:["42","\"42\"","4.2","Ошибка"], answer:"42", xp:10 },
            { id:"v3-2", type:"insert", q:'age = ___("25")', opts:["int","str","float","num"], answer:"int", xp:10 },
            { id:"v3-3", type:"write", q:'Преобразуй "3.14" в float', answer:'float("3.14")', xp:15 },
            { id:"v3-4", type:"choice", q:'int("hello") вызовет?', opts:["0","None","Ошибку","hello"], answer:"Ошибку", xp:10 },
            { id:"v3-5", type:"write", q:"Преобразуй число 42 в строку", answer:'str(42)', xp:15 }
        ]},
        { id:"v4", title:"f-строки", exercises:[
            { id:"v4-t1", type:"theory", q:"f-строки (форматирование)", text:"f-строки позволяют вставлять переменные в текст! Добавь f перед кавычками.", code:'name = "Алиса"\nage = 25\nprint(f"Привет, {name}!")\nprint(f"Тебе {age} лет")' },
            { id:"v4-1", type:"choice", q:'age=25; print(f"Мне {age} лет") выведет?', opts:["Мне age лет","Мне {age} лет","Мне 25 лет","Ошибка"], answer:"Мне 25 лет", xp:10 },
            { id:"v4-2", type:"insert", q:'name="Alice"; print(___"Привет, {name}!")', opts:["f","$","@",""], answer:"f", xp:10 },
            { id:"v4-3", type:"write", q:'x=5; Выведи "x = 5" через f-строку', answer:'print(f"x = {x}")', xp:15 },
            { id:"v4-4", type:"choice", q:'print(f"{2+3}") выведет?', opts:["2+3","{2+3}","5","Ошибка"], answer:"5", xp:10 },
            { id:"v4-5", type:"write", q:'a=10, b=20; выведи "10 + 20 = 30"', answer:'print(f"{a} + {b} = {a+b}")', xp:20 }
        ]}
    ]},

    { id:"conditions", title:"Условия", icon:"🔀", desc:"if, elif, else", req:["variables"], lessons:[
        { id:"c1", title:"if — первые условия", exercises:[
            { id:"c1-t1", type:"theory", q:"Условный оператор if", text:"if выполняет код при определённом условии. После if — двоеточие, код внутри — с отступом.", code:'age = 18\nif age >= 18:\n    print("Можно голосовать!")' },
            { id:"c1-1", type:"choice", q:"Что в конце строки с if?", opts:[";",":","{","Ничего"], answer:":", xp:10 },
            { id:"c1-2", type:"choice", q:'x=10; if x>5: print("Да") выведет?', opts:["Да","Нет","Ошибка","x>5"], answer:"Да", xp:10 },
            { id:"c1-3", type:"insert", q:"___ age>=18:", opts:["if","when","check","test"], answer:"if", xp:10 },
            { id:"c1-4", type:"write", q:'Если x > 10, выведи "Большое"', answer:'if x > 10:\n    print("Большое")', xp:15 },
            { id:"c1-5", type:"fix", q:"Исправь:", code:'if x > 5\n    print("Да")', answer:'if x > 5:\n    print("Да")', xp:15 }
        ]},
        { id:"c2", title:"else ветка", exercises:[
            { id:"c2-t1", type:"theory", q:"else — иначе", text:"else выполняется когда условие if НЕ выполнилось.", code:'x = 3\nif x > 5:\n    print("Большое")\nelse:\n    print("Маленькое")' },
            { id:"c2-1", type:"choice", q:'x=3; if x>5: "Да" else: "Нет" выведет?', opts:["Да","Нет","ДаНет","Ничего"], answer:"Нет", xp:10 },
            { id:"c2-2", type:"insert", q:'if age>=18: print("OK")\n___: print("Нет")', opts:["else","elif","otherwise","then"], answer:"else", xp:10 },
            { id:"c2-3", type:"write", q:'Если x > 0 — "Положительное", иначе "Отрицательное"', answer:'if x > 0:\n    print("Положительное")\nelse:\n    print("Отрицательное")', xp:15 },
            { id:"c2-4", type:"choice", q:"Можно ли else без if?", opts:["Да","Нет","Иногда","С elif"], answer:"Нет", xp:10 }
        ]},
        { id:"c3", title:"elif", exercises:[
            { id:"c3-t1", type:"theory", q:"elif — ещё условие", text:"elif проверяет дополнительное условие если предыдущее не выполнилось.", code:'score = 75\nif score >= 90:\n    print("Отлично")\nelif score >= 70:\n    print("Хорошо")\nelse:\n    print("Надо постараться")' },
            { id:"c3-1", type:"choice", q:'score=75; "A" если >=90, "B" если >=70, "C" иначе', opts:["A","B","C","AB"], answer:"B", xp:10 },
            { id:"c3-2", type:"insert", q:'if x>10: print("Много")\n___ x>5: print("Средне")', opts:["elif","else if","elseif","else"], answer:"elif", xp:10 },
            { id:"c3-3", type:"write", q:"Оценка: >=90 Отлично, >=70 Хорошо, иначе Плохо", answer:'if score >= 90:\n    print("Отлично")\nelif score >= 70:\n    print("Хорошо")\nelse:\n    print("Плохо")', xp:20 },
            { id:"c3-4", type:"choice", q:"Сколько elif можно использовать?", opts:["1","2","3","Сколько угодно"], answer:"Сколько угодно", xp:10 }
        ]},
        { id:"c4", title:"Операторы сравнения", exercises:[
            { id:"c4-t1", type:"theory", q:"Сравнения", text:"== равно  |  != не равно\n> больше  |  < меньше\n>= больше или равно  |  <= меньше или равно", code:"5 == 5  # True\n5 != 3  # True\n5 > 3   # True" },
            { id:"c4-1", type:"choice", q:"5 == 5 вернёт?", opts:["True","False","5","1"], answer:"True", xp:10 },
            { id:"c4-2", type:"choice", q:"5 != 3 вернёт?", opts:["True","False","2","Ошибка"], answer:"True", xp:10 },
            { id:"c4-3", type:"insert", q:'if x ___ 10: print("Равно")', opts:["=","==","===","equals"], answer:"==", xp:10 },
            { id:"c4-4", type:"fix", q:"Исправь:", code:'if x = 5:\n    print("Пять")', answer:'if x == 5:\n    print("Пять")', xp:15 },
            { id:"c4-5", type:"choice", q:"10 >= 10?", opts:["True","False","10","Ошибка"], answer:"True", xp:10 }
        ]},
        { id:"c5", title:"and, or, not", exercises:[
            { id:"c5-t1", type:"theory", q:"Логические операторы", text:"and — И (оба условия)\nor — ИЛИ (любое условие)\nnot — НЕ (инверсия)", code:"True and False  # False\nTrue or False   # True\nnot True        # False" },
            { id:"c5-1", type:"choice", q:"True and False?", opts:["True","False","None","Ошибка"], answer:"False", xp:10 },
            { id:"c5-2", type:"choice", q:"True or False?", opts:["True","False","None","Ошибка"], answer:"True", xp:10 },
            { id:"c5-3", type:"insert", q:"if x > 0 ___ x < 100:", opts:["and","or","&&","||"], answer:"and", xp:10 },
            { id:"c5-4", type:"choice", q:"not True?", opts:["True","False","None","1"], answer:"False", xp:10 },
            { id:"c5-5", type:"write", q:"Проверь что x от 1 до 100", answer:"if x >= 1 and x <= 100:\n    print(True)", xp:15 }
        ]}
    ]},

    { id:"loops", title:"Циклы", icon:"🔄", desc:"for, while", req:["conditions"], lessons:[
        { id:"l1", title:"Цикл for", exercises:[
            { id:"l1-t1", type:"theory", q:"Цикл for", text:"for повторяет код заданное количество раз. range(n) создаёт числа от 0 до n-1.", code:"for i in range(3):\n    print(i)\n# 0, 1, 2" },
            { id:"l1-1", type:"choice", q:"for i in range(3) выполнится?", opts:["2 раза","3 раза","4 раза","Бесконечно"], answer:"3 раза", xp:10 },
            { id:"l1-2", type:"insert", q:"for i in ___(5): print(i)", opts:["range","list","array","loop"], answer:"range", xp:10 },
            { id:"l1-3", type:"choice", q:"range(2, 5) даёт?", opts:["2,3,4","2,3,4,5","0,1,2,3,4","2,5"], answer:"2,3,4", xp:10 },
            { id:"l1-4", type:"write", q:"Выведи числа от 0 до 4", answer:"for i in range(5):\n    print(i)", xp:15 },
            { id:"l1-5", type:"write", q:"Выведи числа от 1 до 10", answer:"for i in range(1, 11):\n    print(i)", xp:15 },
            { id:"l1-6", type:"choice", q:"range(0, 10, 2) даёт?", opts:["0,2,4,6,8","0,1,2","2,4,6,8,10","0,2,4"], answer:"0,2,4,6,8", xp:10 }
        ]},
        { id:"l2", title:"for по коллекциям", exercises:[
            { id:"l2-t1", type:"theory", q:"Перебор коллекций", text:"for может перебирать строки, списки и другие коллекции.", code:'for char in "Hi":\n    print(char)\n# H\n# i\n\nfor fruit in ["apple", "banana"]:\n    print(fruit)' },
            { id:"l2-1", type:"choice", q:'for c in "Hi": print(c) выведет?', opts:["Hi","H i","H потом i","Ошибка"], answer:"H потом i", xp:10 },
            { id:"l2-2", type:"write", q:'Выведи каждую букву "Python"', answer:'for c in "Python":\n    print(c)', xp:15 },
            { id:"l2-3", type:"write", q:'Выведи каждый элемент [1,2,3]', answer:'for x in [1, 2, 3]:\n    print(x)', xp:15 },
            { id:"l2-4", type:"choice", q:'for x in []: print(x) выведет?', opts:["None","Ошибку","Ничего","[]"], answer:"Ничего", xp:10 }
        ]},
        { id:"l3", title:"Цикл while", exercises:[
            { id:"l3-t1", type:"theory", q:"Цикл while", text:"while выполняется пока условие True. Не забудь менять условие!", code:"x = 0\nwhile x < 3:\n    print(x)\n    x += 1" },
            { id:"l3-1", type:"choice", q:"x=0; while x<3: print(x); x+=1 выведет?", opts:["0,1,2","0,1,2,3","1,2,3","Бесконечно"], answer:"0,1,2", xp:10 },
            { id:"l3-2", type:"insert", q:"___ x < 10: x += 1", opts:["while","for","loop","repeat"], answer:"while", xp:10 },
            { id:"l3-3", type:"write", q:"Считай от 1 до 5 через while", answer:"x = 1\nwhile x <= 5:\n    print(x)\n    x += 1", xp:15 },
            { id:"l3-4", type:"choice", q:"while True: pass — что будет?", opts:["Ошибка","Ничего","Бесконечный цикл","False"], answer:"Бесконечный цикл", xp:10 }
        ]},
        { id:"l4", title:"break и continue", exercises:[
            { id:"l4-t1", type:"theory", q:"break и continue", text:"break — выходит из цикла\ncontinue — пропускает итерацию", code:"for i in range(5):\n    if i == 3:\n        break\n    print(i)  # 0, 1, 2" },
            { id:"l4-1", type:"choice", q:"for i in range(5): if i==3: break — выведет?", opts:["0,1,2","0,1,2,3","0,1,2,3,4","3"], answer:"0,1,2", xp:10 },
            { id:"l4-2", type:"choice", q:"for i in range(4): if i==2: continue — выведет?", opts:["0,1,3","0,1,2,3","0,1","2"], answer:"0,1,3", xp:10 },
            { id:"l4-3", type:"insert", q:"for i in range(10):\n    if i == 5: ___", opts:["break","stop","exit","end"], answer:"break", xp:10 },
            { id:"l4-4", type:"write", q:"Выведи числа от 0 до 9, пропуская 5", answer:"for i in range(10):\n    if i == 5:\n        continue\n    print(i)", xp:20 }
        ]},
        { id:"l5", title:"Вложенные циклы", exercises:[
            { id:"l5-t1", type:"theory", q:"Вложенные циклы", text:"Цикл внутри цикла — вложенный цикл.", code:'for i in range(3):\n    for j in range(3):\n        print(f"{i},{j}")' },
            { id:"l5-1", type:"choice", q:"2 вложенных цикла по 3 — сколько итераций?", opts:["3","6","9","12"], answer:"9", xp:10 },
            { id:"l5-2", type:"write", q:"Выведи таблицу умножения 3x3", answer:'for i in range(1, 4):\n    for j in range(1, 4):\n        print(f"{i}*{j}={i*j}")', xp:25 }
        ]}
    ]},

    { id:"functions", title:"Функции", icon:"⚡", desc:"def, return", req:["loops"], lessons:[
        { id:"f1", title:"Создание функций", exercises:[
            { id:"f1-t1", type:"theory", q:"Что такое функция?", text:"Функция — блок кода с именем. Создаётся через def.", code:'def say_hello():\n    print("Hello!")\n\nsay_hello()  # Hello!' },
            { id:"f1-1", type:"choice", q:"Как определить функцию?", opts:["function hello():","def hello():","func hello():","void hello():"], answer:"def hello():", xp:10 },
            { id:"f1-2", type:"insert", q:'___ greet(): print("Hello!")', opts:["def","function","func","define"], answer:"def", xp:10 },
            { id:"f1-3", type:"write", q:"Создай функцию say_hi", answer:'def say_hi():\n    print("Hi")', xp:15 },
            { id:"f1-4", type:"choice", q:"def hello(): ... — hello это?", opts:["Переменная","Функция","Класс","Модуль"], answer:"Функция", xp:10 },
            { id:"f1-5", type:"fix", q:"Исправь:", code:'def hello()\n    print("Hi")', answer:'def hello():\n    print("Hi")', xp:15 }
        ]},
        { id:"f2", title:"Параметры", exercises:[
            { id:"f2-t1", type:"theory", q:"Параметры функции", text:"Функция может принимать значения — параметры.", code:'def greet(name):\n    print(f"Привет, {name}!")\n\ngreet("Алиса")' },
            { id:"f2-1", type:"choice", q:'greet("Alice") где def greet(name) — что в name?', opts:["greet","name","Alice","Ошибка"], answer:"Alice", xp:10 },
            { id:"f2-2", type:"write", q:"Создай square(n) выводящую n*n", answer:"def square(n):\n    print(n * n)", xp:15 },
            { id:"f2-3", type:"write", q:"Создай add(a, b) выводящую сумму", answer:"def add(a, b):\n    print(a + b)", xp:15 },
            { id:"f2-4", type:"choice", q:"def f(a, b, c) — сколько параметров?", opts:["1","2","3","4"], answer:"3", xp:10 }
        ]},
        { id:"f3", title:"return", exercises:[
            { id:"f3-t1", type:"theory", q:"Возврат значения", text:"return возвращает значение из функции.", code:"def double(x):\n    return x * 2\n\nresult = double(5)  # 10" },
            { id:"f3-1", type:"choice", q:"def double(x): return x*2; double(5)?", opts:["10","5","None","x*2"], answer:"10", xp:10 },
            { id:"f3-2", type:"insert", q:"def add(a, b): ___ a + b", opts:["return","print","give","output"], answer:"return", xp:10 },
            { id:"f3-3", type:"write", q:"Создай is_even(n) - True если чётное", answer:"def is_even(n):\n    return n % 2 == 0", xp:15 },
            { id:"f3-4", type:"choice", q:"Функция без return возвращает?", opts:["0","''","None","False"], answer:"None", xp:10 },
            { id:"f3-5", type:"write", q:"Функция abs_val(n) — модуль числа", answer:"def abs_val(n):\n    if n < 0:\n        return -n\n    return n", xp:20 }
        ]},
        { id:"f4", title:"Значения по умолчанию", exercises:[
            { id:"f4-t1", type:"theory", q:"Значения по умолчанию", text:"Параметрам можно задать значение по умолчанию.", code:'def greet(name="World"):\n    print(f"Hi, {name}!")\n\ngreet()  # Hi, World!' },
            { id:"f4-1", type:"choice", q:'def greet(name="World"): greet() выведет?', opts:["Hi, World","Hi, name","Hi,","Ошибка"], answer:"Hi, World", xp:10 },
            { id:"f4-2", type:"insert", q:"def power(x, n___): return x ** n", opts:["=2","==2",":2","2"], answer:"=2", xp:10 },
            { id:"f4-3", type:"write", q:"Функция repeat(s, n=3) повторяет строку", answer:'def repeat(s, n=3):\n    return s * n', xp:15 },
            { id:"f4-4", type:"choice", q:'greet("Bob") где name="World" — что в name?', opts:["World","Bob","Ошибка","None"], answer:"Bob", xp:10 }
        ]},
        { id:"f5", title:"lambda", exercises:[
            { id:"f5-t1", type:"theory", q:"lambda", text:"lambda — короткая анонимная функция в одну строку.", code:"square = lambda x: x ** 2\nprint(square(5))  # 25\n\nadd = lambda a, b: a + b\nprint(add(3, 4))  # 7" },
            { id:"f5-1", type:"choice", q:"f = lambda x: x+1; f(5)?", opts:["5","6","x+1","Ошибка"], answer:"6", xp:10 },
            { id:"f5-2", type:"insert", q:"square = ___ x: x ** 2", opts:["lambda","func","def","->"], answer:"lambda", xp:10 },
            { id:"f5-3", type:"write", q:"Создай lambda для утроения числа", answer:"triple = lambda x: x * 3", xp:15 },
            { id:"f5-4", type:"choice", q:"lambda a, b: a * b — это?", opts:["Ошибка","Умножение","Класс","Модуль"], answer:"Умножение", xp:10 }
        ]}
    ]},

    { id:"lists", title:"Списки", icon:"📋", desc:"Массивы данных", req:["functions"], lessons:[
        { id:"li1", title:"Создание списков", exercises:[
            { id:"li1-t1", type:"theory", q:"Что такое список?", text:"Список — упорядоченная изменяемая коллекция элементов.", code:'fruits = ["яблоко", "банан", "апельсин"]\nnumbers = [1, 2, 3, 4, 5]\nempty = []' },
            { id:"li1-1", type:"choice", q:"Как создать пустой список?", opts:["list = ()","list = []","list = {}","list = \"\""], answer:"list = []", xp:10 },
            { id:"li1-2", type:"write", q:"Создай список [1, 2, 3]", answer:"numbers = [1, 2, 3]", xp:15 },
            { id:"li1-3", type:"choice", q:'["a", 1, True] — можно?', opts:["Да","Нет","Только числа","Ошибка"], answer:"Да", xp:10 },
            { id:"li1-4", type:"write", q:"Создай список из 5 нулей", answer:"zeros = [0] * 5", xp:15 }
        ]},
        { id:"li2", title:"Индексация", exercises:[
            { id:"li2-t1", type:"theory", q:"Индексы", text:"Нумерация с 0. Отрицательные — с конца.", code:"nums = [10, 20, 30]\nprint(nums[0])   # 10\nprint(nums[-1])  # 30" },
            { id:"li2-1", type:"choice", q:"nums=[10,20,30]; nums[0]?", opts:["10","20","30","Ошибка"], answer:"10", xp:10 },
            { id:"li2-2", type:"choice", q:"nums=[10,20,30]; nums[-1]?", opts:["10","20","30","Ошибка"], answer:"30", xp:10 },
            { id:"li2-3", type:"write", q:"Получи второй элемент списка a", answer:"print(a[1])", xp:15 },
            { id:"li2-4", type:"choice", q:"nums=[1,2,3]; nums[3]?", opts:["3","None","0","Ошибка"], answer:"Ошибка", xp:10 },
            { id:"li2-5", type:"write", q:"Измени первый элемент на 99", answer:"nums[0] = 99", xp:15 }
        ]},
        { id:"li3", title:"Срезы", exercises:[
            { id:"li3-t1", type:"theory", q:"Срезы", text:"list[start:end] — от start до end-1.\nlist[::step] — с шагом.", code:"nums = [1, 2, 3, 4, 5]\nprint(nums[1:3])  # [2, 3]\nprint(nums[:3])   # [1, 2, 3]\nprint(nums[::2])  # [1, 3, 5]" },
            { id:"li3-1", type:"choice", q:"[1,2,3,4,5][1:3]?", opts:["[1,2]","[2,3]","[2,3,4]","[1,2,3]"], answer:"[2,3]", xp:10 },
            { id:"li3-2", type:"choice", q:"[1,2,3,4,5][:3]?", opts:["[1,2,3]","[3,4,5]","[1,2]","[4,5]"], answer:"[1,2,3]", xp:10 },
            { id:"li3-3", type:"choice", q:"[1,2,3,4,5][::2]?", opts:["[1,3,5]","[2,4]","[1,2]","[5,4,3]"], answer:"[1,3,5]", xp:10 },
            { id:"li3-4", type:"write", q:"Переверни список через срез", answer:"print(nums[::-1])", xp:15 }
        ]},
        { id:"li4", title:"Методы списков", exercises:[
            { id:"li4-t1", type:"theory", q:"Методы списков", text:"append() — добавить\nremove() — удалить\npop() — удалить последний\nsort() — сортировать\nlen() — длина", code:"nums = [3, 1, 2]\nnums.append(4)  # [3, 1, 2, 4]\nnums.sort()     # [1, 2, 3, 4]\nlen(nums)       # 4" },
            { id:"li4-1", type:"choice", q:"Как добавить в конец?", opts:["list.add(x)","list.append(x)","list.push(x)","list.insert(x)"], answer:"list.append(x)", xp:10 },
            { id:"li4-2", type:"write", q:'Добавь "orange" в fruits', answer:'fruits.append("orange")', xp:15 },
            { id:"li4-3", type:"choice", q:"nums.pop() — что делает?", opts:["Удаляет первый","Удаляет последний","Очищает","Сортирует"], answer:"Удаляет последний", xp:10 },
            { id:"li4-4", type:"write", q:"Отсортируй список nums", answer:"nums.sort()", xp:10 },
            { id:"li4-5", type:"choice", q:"3 in [1,2,3]?", opts:["True","False","3","Ошибка"], answer:"True", xp:10 }
        ]},
        { id:"li5", title:"List comprehension", exercises:[
            { id:"li5-t1", type:"theory", q:"List comprehension", text:"Короткий способ создать список.", code:"squares = [x**2 for x in range(5)]\n# [0, 1, 4, 9, 16]\n\nevens = [x for x in range(10) if x % 2 == 0]\n# [0, 2, 4, 6, 8]" },
            { id:"li5-1", type:"choice", q:"[x*2 for x in range(3)]?", opts:["[0,2,4]","[2,4,6]","[0,1,2]","[1,2,3]"], answer:"[0,2,4]", xp:10 },
            { id:"li5-2", type:"write", q:"Квадраты от 1 до 5", answer:"[x**2 for x in range(1, 6)]", xp:15 },
            { id:"li5-3", type:"write", q:"Чётные числа от 0 до 20", answer:"[x for x in range(21) if x % 2 == 0]", xp:20 },
            { id:"li5-4", type:"choice", q:'[c.upper() for c in "hi"]?', opts:['["H","I"]','["h","i"]',"HI","Ошибка"], answer:'["H","I"]', xp:10 }
        ]}
    ]},

    { id:"dicts", title:"Словари", icon:"📖", desc:"Ключ-значение", req:["lists"], lessons:[
        { id:"d1", title:"Создание словарей", exercises:[
            { id:"d1-t1", type:"theory", q:"Что такое словарь?", text:"Словарь хранит пары ключ-значение. Ключи уникальны.", code:'person = {\n    "name": "Алиса",\n    "age": 25\n}' },
            { id:"d1-1", type:"choice", q:"Как создать пустой словарь?", opts:["d = []","d = ()","d = {}","d = \"\""], answer:"d = {}", xp:10 },
            { id:"d1-2", type:"write", q:"Создай person с name и age", answer:'person = {"name": "Bob", "age": 30}', xp:15 },
            { id:"d1-3", type:"choice", q:"Ключи в словаре могут повторяться?", opts:["Да","Нет","Иногда","Зависит от типа"], answer:"Нет", xp:10 }
        ]},
        { id:"d2", title:"Доступ к значениям", exercises:[
            { id:"d2-t1", type:"theory", q:"Получение значений", text:"По ключу через [] или .get()", code:'d = {"a": 1, "b": 2}\nprint(d["a"])      # 1\nprint(d.get("c"))  # None\nprint(d.get("c", 0))  # 0' },
            { id:"d2-1", type:"choice", q:'d = {"a": 1}; d["a"]?', opts:["1","a","None","Ошибка"], answer:"1", xp:10 },
            { id:"d2-2", type:"choice", q:'d.get("x", 0) если "x" нет?', opts:["None","0","Ошибка","\"\""], answer:"0", xp:10 },
            { id:"d2-3", type:"choice", q:'d = {"a": 1}; d["b"]?', opts:["None","0","Ошибка","False"], answer:"Ошибка", xp:10 },
            { id:"d2-4", type:"write", q:"Получи имя из person безопасно", answer:'print(person.get("name", "Unknown"))', xp:15 }
        ]},
        { id:"d3", title:"Изменение словарей", exercises:[
            { id:"d3-t1", type:"theory", q:"Изменение", text:"Добавить: d[key] = value\nУдалить: del d[key]\nОбновить: d.update(other)", code:'d = {"a": 1}\nd["b"] = 2  # добавить\nd["a"] = 10 # изменить\ndel d["b"]  # удалить' },
            { id:"d3-1", type:"write", q:'Добавь phone: "123"', answer:'user["phone"] = "123"', xp:15 },
            { id:"d3-2", type:"choice", q:'Как удалить ключ "age"?', opts:['user.remove("age")','del user["age"]','user.delete("age")','user["age"] = None'], answer:'del user["age"]', xp:10 },
            { id:"d3-3", type:"write", q:"Обнови словарь a данными из b", answer:"a.update(b)", xp:15 }
        ]},
        { id:"d4", title:"Перебор словарей", exercises:[
            { id:"d4-t1", type:"theory", q:"Перебор", text:"keys() — ключи\nvalues() — значения\nitems() — пары", code:'d = {"a": 1, "b": 2}\nfor key in d:\n    print(key)\nfor key, val in d.items():\n    print(f"{key}: {val}")' },
            { id:"d4-1", type:"write", q:"Переберри ключи словаря d", answer:"for key in d:\n    print(key)", xp:15 },
            { id:"d4-2", type:"write", q:"Выведи все значения словаря", answer:"for val in d.values():\n    print(val)", xp:15 },
            { id:"d4-3", type:"choice", q:'{"a":1}.items() возвращает?', opts:["ключи","значения","пары","строку"], answer:"пары", xp:10 }
        ]},
        { id:"d5", title:"Dict comprehension", exercises:[
            { id:"d5-t1", type:"theory", q:"Dict comprehension", text:"Как list comprehension, но для словарей.", code:"squares = {x: x**2 for x in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}" },
            { id:"d5-1", type:"choice", q:"{x: x*2 for x in range(3)} даёт?", opts:["{0:0,1:2,2:4}","[0,2,4]","{0,2,4}","Ошибка"], answer:"{0:0,1:2,2:4}", xp:10 },
            { id:"d5-2", type:"write", q:"Словарь {1:1, 2:4, 3:9, 4:16, 5:25}", answer:"{x: x**2 for x in range(1, 6)}", xp:20 }
        ]}
    ]},

    { id:"oop", title:"ООП", icon:"🏗️", desc:"Классы и объекты", req:["dicts"], lessons:[
        { id:"o1", title:"Классы", exercises:[
            { id:"o1-t1", type:"theory", q:"Что такое класс?", text:"Класс — шаблон для создания объектов. Объединяет данные и функции.", code:"class Dog:\n    pass\n\nmy_dog = Dog()\nprint(type(my_dog))  # <class 'Dog'>" },
            { id:"o1-1", type:"choice", q:"Как определить класс?", opts:["class Dog:","def Dog:","object Dog:","new Dog:"], answer:"class Dog:", xp:10 },
            { id:"o1-2", type:"write", q:"Создай пустой класс Person", answer:"class Person:\n    pass", xp:15 },
            { id:"o1-3", type:"choice", q:"Первая буква имени класса?", opts:["Маленькая","Большая","Любая","Цифра"], answer:"Большая", xp:10 }
        ]},
        { id:"o2", title:"__init__", exercises:[
            { id:"o2-t1", type:"theory", q:"Конструктор", text:"__init__ вызывается автоматически при создании объекта. self — ссылка на сам объект.", code:'class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\ndog = Dog("Шарик", 3)\nprint(dog.name)  # Шарик' },
            { id:"o2-1", type:"insert", q:"class Dog: def ___(self, name): self.name = name", opts:["__init__","init","constructor","create"], answer:"__init__", xp:10 },
            { id:"o2-2", type:"choice", q:"Что такое self?", opts:["Имя класса","Ссылка на объект","Конструктор","Родитель"], answer:"Ссылка на объект", xp:10 },
            { id:"o2-3", type:"write", q:"Класс Person с name и age", answer:'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age', xp:20 },
            { id:"o2-4", type:"choice", q:"self — первый параметр?", opts:["Всегда","Иногда","Никогда","Только в __init__"], answer:"Всегда", xp:10 }
        ]},
        { id:"o3", title:"Методы", exercises:[
            { id:"o3-t1", type:"theory", q:"Методы класса", text:"Методы — функции внутри класса. Первый параметр — self.", code:'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(f"{self.name}: Гав!")\n\ndog = Dog("Rex")\ndog.bark()  # Rex: Гав!' },
            { id:"o3-1", type:"insert", q:'class Dog: def bark(___): print("Woof!")', opts:["self","this","me","obj"], answer:"self", xp:10 },
            { id:"o3-2", type:"choice", q:"Как вызвать bark?", opts:["bark(dog)","Dog.bark()","dog.bark()","call bark"], answer:"dog.bark()", xp:10 },
            { id:"o3-3", type:"write", q:"Метод greet() выводит имя", answer:'def greet(self):\n    print(f"Hi, {self.name}")', xp:15 },
            { id:"o3-4", type:"write", q:"Метод is_adult() - True если age >= 18", answer:"def is_adult(self):\n    return self.age >= 18", xp:20 }
        ]},
        { id:"o4", title:"Наследование", exercises:[
            { id:"o4-t1", type:"theory", q:"Наследование", text:"Класс может наследовать свойства другого класса.", code:'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name}: Гав!"' },
            { id:"o4-1", type:"insert", q:"class Dog(___): pass", opts:["Animal","Object","Base","Parent"], answer:"Animal", xp:10 },
            { id:"o4-2", type:"write", q:"Класс Cat наследующий Animal", answer:"class Cat(Animal):\n    def speak(self):\n        return \"Мяу!\"", xp:15 },
            { id:"o4-3", type:"choice", q:"super() вызывает?", opts:["Метод потомка","Метод родителя","Ошибку","Конструктор"], answer:"Метод родителя", xp:10 },
            { id:"o4-4", type:"choice", q:"Можно наследовать от нескольких?", opts:["Да","Нет","Только 2","С ограничениями"], answer:"Да", xp:10 }
        ]}
    ]},

    { id:"tuples_sets", title:"Кортежи и множества", icon:"📎", desc:"tuple, set, frozenset", req:["lists"], lessons:[
        { id:"ts1", title:"Кортежи", exercises:[
            { id:"ts1-t1", type:"theory", q:"Кортежи (tuple)", text:"Кортеж — неизменяемый список. Создаётся через ().", code:'point = (3, 5)\ncolors = ("red", "green", "blue")\nprint(point[0])  # 3\n# point[0] = 10  # Ошибка!' },
            { id:"ts1-1", type:"choice", q:"Как создать кортеж?", opts:["[]","()","{}","<>"], answer:"()", xp:10 },
            { id:"ts1-2", type:"choice", q:"Можно изменить кортеж?", opts:["Да","Нет","Иногда","Через метод"], answer:"Нет", xp:10 },
            { id:"ts1-3", type:"write", q:"Создай кортеж (1, 2, 3)", answer:"t = (1, 2, 3)", xp:15 },
            { id:"ts1-4", type:"choice", q:"a, b = (1, 2) — что в a?", opts:["(1,2)","1","2","Ошибка"], answer:"1", xp:10 }
        ]},
        { id:"ts2", title:"Множества", exercises:[
            { id:"ts2-t1", type:"theory", q:"Множества (set)", text:"Множество — неупорядоченная коллекция уникальных элементов.", code:"s = {1, 2, 3, 2, 1}\nprint(s)  # {1, 2, 3}\ns.add(4)\ns.remove(1)" },
            { id:"ts2-1", type:"choice", q:"{1, 2, 2, 3} — что получится?", opts:["{1,2,2,3}","{1,2,3}","[1,2,3]","Ошибка"], answer:"{1,2,3}", xp:10 },
            { id:"ts2-2", type:"write", q:"Создай множество {1, 2, 3}", answer:"s = {1, 2, 3}", xp:15 },
            { id:"ts2-3", type:"choice", q:"Множество хранит порядок?", opts:["Да","Нет","Иногда","В Python 3.7+"], answer:"Нет", xp:10 },
            { id:"ts2-4", type:"write", q:"Найди пересечение {1,2,3} и {2,3,4}", answer:"print({1,2,3} & {2,3,4})", xp:20 }
        ]}
    ]},

    { id:"files", title:"Файлы", icon:"📁", desc:"Чтение и запись", req:["oop"], lessons:[
        { id:"fi1", title:"Чтение файлов", exercises:[
            { id:"fi1-t1", type:"theory", q:"Открытие файлов", text:"open() открывает файл. with — безопасно закроет.\nr — чтение, w — запись, a — добавление.", code:'with open("file.txt", "r") as f:\n    content = f.read()\n    print(content)' },
            { id:"fi1-1", type:"choice", q:'Режим "r" означает?', opts:["Запись","Чтение","Добавление","Удаление"], answer:"Чтение", xp:10 },
            { id:"fi1-2", type:"insert", q:'___ open("data.txt") as f: text = f.read()', opts:["with","using","open","file"], answer:"with", xp:10 },
            { id:"fi1-3", type:"choice", q:"f.readlines() возвращает?", opts:["Строку","Список строк","Число строк","Файл"], answer:"Список строк", xp:10 }
        ]},
        { id:"fi2", title:"Запись в файлы", exercises:[
            { id:"fi2-t1", type:"theory", q:"Запись", text:"Режим w создаёт новый файл (или перезаписывает). Режим a добавляет в конец.", code:'with open("output.txt", "w") as f:\n    f.write("Hello!\\n")\n    f.write("World!")' },
            { id:"fi2-1", type:"choice", q:'Режим "w" если файл есть?', opts:["Ошибка","Перезапишет","Добавит","Ничего"], answer:"Перезапишет", xp:10 },
            { id:"fi2-2", type:"choice", q:'Режим "a" означает?', opts:["Чтение","Запись","Добавление","Все"], answer:"Добавление", xp:10 },
            { id:"fi2-3", type:"write", q:'Запиши "Hello" в файл output.txt', answer:'with open("output.txt", "w") as f:\n    f.write("Hello")', xp:15 }
        ]},
        { id:"fi3", title:"CSV и JSON файлы", exercises:[
            { id:"fi3-t1", type:"theory", q:"CSV файлы", text:"CSV — таблица в текстовом файле. Значения разделены запятой.", code:'import csv\nwith open("data.csv") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)' },
            { id:"fi3-1", type:"choice", q:"CSV расшифровывается как?", opts:["Computer Script Values","Comma Separated Values","Code Storage Variable","Compiled Source Version"], answer:"Comma Separated Values", xp:10 },
            { id:"fi3-2", type:"choice", q:"Какой модуль для CSV?", opts:["csv","file","table","data"], answer:"csv", xp:10 }
        ]}
    ]},

    { id:"exceptions", title:"Исключения", icon:"⚠️", desc:"try, except", req:["files"], lessons:[
        { id:"ex1", title:"try-except", exercises:[
            { id:"ex1-t1", type:"theory", q:"try-except", text:"try — попробовать код. except — если ошибка.", code:'try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print("Деление на ноль!")' },
            { id:"ex1-1", type:"insert", q:'___: x = 1/0\nexcept: print("Error")', opts:["try","catch","handle","check"], answer:"try", xp:10 },
            { id:"ex1-2", type:"choice", q:"Что ловит except ZeroDivisionError?", opts:["Все ошибки","Деление на 0","Тип данных","Синтаксис"], answer:"Деление на 0", xp:10 },
            { id:"ex1-3", type:"write", q:"Оберни x=1/0 в try-except", answer:'try:\n    x = 1 / 0\nexcept:\n    print("Ошибка")', xp:15 },
            { id:"ex1-4", type:"choice", q:"except без типа ловит?", opts:["Ничего","Все ошибки","Только TypeError","Синтаксис"], answer:"Все ошибки", xp:10 }
        ]},
        { id:"ex2", title:"Типы исключений", exercises:[
            { id:"ex2-t1", type:"theory", q:"Типы ошибок", text:"ValueError — неверное значение\nTypeError — неверный тип\nIndexError — индекс за пределами\nKeyError — ключ не найден", code:'try:\n    int("hello")\nexcept ValueError:\n    print("Неверное значение!")' },
            { id:"ex2-1", type:"choice", q:'int("abc") вызовет?', opts:["TypeError","ValueError","SyntaxError","IndexError"], answer:"ValueError", xp:10 },
            { id:"ex2-2", type:"choice", q:"[1,2][5] вызовет?", opts:["ValueError","TypeError","IndexError","KeyError"], answer:"IndexError", xp:10 },
            { id:"ex2-3", type:"write", q:"Обработай ValueError", answer:'try:\n    x = int("abc")\nexcept ValueError:\n    print("Ошибка")', xp:15 }
        ]},
        { id:"ex3", title:"finally и raise", exercises:[
            { id:"ex3-t1", type:"theory", q:"finally и raise", text:"finally — всегда выполняется\nraise — вызвать исключение", code:'try:\n    x = 1 / 0\nexcept:\n    print("Ошибка")\nfinally:\n    print("Всегда")\n\nraise ValueError("Плохое значение")' },
            { id:"ex3-1", type:"choice", q:"finally выполняется?", opts:["При ошибке","Без ошибки","Всегда","Никогда"], answer:"Всегда", xp:10 },
            { id:"ex3-2", type:"insert", q:"___ ValueError('Bad value')", opts:["raise","throw","error","except"], answer:"raise", xp:10 },
            { id:"ex3-3", type:"write", q:"Вызови ошибку TypeError", answer:'raise TypeError("Wrong type")', xp:15 }
        ]}
    ]},

    { id:"modules", title:"Модули", icon:"📦", desc:"import", req:["exceptions"], lessons:[
        { id:"m1", title:"Импорт модулей", exercises:[
            { id:"m1-t1", type:"theory", q:"import", text:"import подключает модуль. from ... import — конкретную функцию.", code:"import math\nprint(math.sqrt(16))  # 4.0\n\nfrom random import randint\nprint(randint(1, 10))" },
            { id:"m1-1", type:"choice", q:"Как импортировать math?", opts:["include math","import math","using math","require math"], answer:"import math", xp:10 },
            { id:"m1-2", type:"write", q:"Импортируй random", answer:"import random", xp:10 },
            { id:"m1-3", type:"choice", q:"from math import sqrt позволяет?", opts:["Импорт всего","Импорт sqrt","Удалить math","Ничего"], answer:"Импорт sqrt", xp:10 },
            { id:"m1-4", type:"insert", q:"___ math import pi", opts:["from","import","use","get"], answer:"from", xp:10 }
        ]},
        { id:"m2", title:"Стандартные модули", exercises:[
            { id:"m2-t1", type:"theory", q:"Полезные модули", text:"math — математика\nrandom — случайные числа\ndatetime — дата и время\nos — файловая система\njson — работа с JSON", code:"import datetime\nnow = datetime.datetime.now()\nprint(now)" },
            { id:"m2-1", type:"choice", q:"Модуль для случайных чисел?", opts:["math","random","chance","dice"], answer:"random", xp:10 },
            { id:"m2-2", type:"choice", q:"Модуль для даты и времени?", opts:["time","date","datetime","calendar"], answer:"datetime", xp:10 },
            { id:"m2-3", type:"write", q:"Получи текущую дату", answer:"import datetime\nprint(datetime.date.today())", xp:15 }
        ]}
    ]},

    { id:"strings_adv", title:"Строки++", icon:"📜", desc:"Методы строк", req:["modules"], lessons:[
        { id:"s1", title:"Методы строк", exercises:[
            { id:"s1-t1", type:"theory", q:"Методы строк", text:"upper() — верхний регистр\nlower() — нижний\nstrip() — убрать пробелы\nreplace() — заменить", code:'"hello".upper()  # HELLO\n" hi ".strip()   # "hi"\n"abc".replace("a", "x")  # "xbc"' },
            { id:"s1-1", type:"choice", q:'"hello".upper()?', opts:["hello","HELLO","Hello","hELLO"], answer:"HELLO", xp:10 },
            { id:"s1-2", type:"write", q:"Переведи строку s в нижний регистр", answer:"print(s.lower())", xp:15 },
            { id:"s1-3", type:"choice", q:'" hello ".strip()?', opts:[" hello","hello ","hello"," hello "], answer:"hello", xp:10 },
            { id:"s1-4", type:"write", q:'Замени все пробелы на _ в строке', answer:'print(s.replace(" ", "_"))', xp:15 }
        ]},
        { id:"s2", title:"split и join", exercises:[
            { id:"s2-t1", type:"theory", q:"split и join", text:"split() — строку в список\njoin() — список в строку", code:'"a,b,c".split(",")  # ["a","b","c"]\n", ".join(["a","b","c"])  # "a, b, c"' },
            { id:"s2-1", type:"choice", q:'"a,b,c".split(",")?', opts:['["a,b,c"]','["a","b","c"]','"a b c"',"Ошибка"], answer:'["a","b","c"]', xp:10 },
            { id:"s2-2", type:"write", q:'Раздели "hello world" по пробелу', answer:'"hello world".split(" ")', xp:15 },
            { id:"s2-3", type:"write", q:'Объедини ["a","b","c"] через "-"', answer:'print("-".join(["a","b","c"]))', xp:15 }
        ]},
        { id:"s3", title:"Поиск в строках", exercises:[
            { id:"s3-t1", type:"theory", q:"Поиск", text:"in — проверка вхождения\nfind() — позиция подстроки\ncount() — количество вхождений\nstartswith() / endswith()", code:'"hello" in "hello world"  # True\n"hello".find("ll")  # 2\n"hello".count("l")  # 2' },
            { id:"s3-1", type:"choice", q:'"py" in "python"?', opts:["True","False","py","2"], answer:"True", xp:10 },
            { id:"s3-2", type:"choice", q:'"hello".count("l")?', opts:["1","2","3","0"], answer:"2", xp:10 },
            { id:"s3-3", type:"write", q:"Проверь что email заканчивается на .com", answer:'print(email.endswith(".com"))', xp:15 }
        ]}
    ]},

    { id:"decorators", title:"Декораторы", icon:"🎀", desc:"@decorator", req:["functions"], lessons:[
        { id:"dec1", title:"Декораторы", exercises:[
            { id:"dec1-t1", type:"theory", q:"Что такое декоратор?", text:"Декоратор — функция, которая модифицирует другую функцию. Обозначается @.", code:"def bold(func):\n    def wrapper():\n        return '<b>' + func() + '</b>'\n    return wrapper\n\n@bold\ndef hello():\n    return 'Hello'\n\nprint(hello())  # <b>Hello</b>" },
            { id:"dec1-1", type:"choice", q:"Символ декоратора?", opts:["#","@","$","&"], answer:"@", xp:10 },
            { id:"dec1-2", type:"choice", q:"Декоратор принимает?", opts:["Строку","Число","Функцию","Список"], answer:"Функцию", xp:10 },
            { id:"dec1-3", type:"insert", q:"___ my_decorator\ndef hello(): pass", opts:["@","#","$","def"], answer:"@", xp:10 }
        ]}
    ]},

    { id:"generators", title:"Генераторы", icon:"🔋", desc:"yield, iter", req:["decorators"], lessons:[
        { id:"gen1", title:"Генераторы", exercises:[
            { id:"gen1-t1", type:"theory", q:"Что такое генератор?", text:"Генератор — функция с yield. Возвращает значения по одному, экономя память.", code:"def count_up(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\nfor x in count_up(3):\n    print(x)  # 0, 1, 2" },
            { id:"gen1-1", type:"choice", q:"yield vs return?", opts:["Одинаковы","yield приостанавливает","yield завершает","yield ломает"], answer:"yield приостанавливает", xp:10 },
            { id:"gen1-2", type:"insert", q:"def gen(): ___ 1; ___ 2", opts:["yield","return","give","send"], answer:"yield", xp:10 },
            { id:"gen1-3", type:"choice", q:"Генератор экономит?", opts:["Время","Память","CPU","Диск"], answer:"Память", xp:10 }
        ]}
    ]},

    { id:"json_mod", title:"JSON", icon:"📄", desc:"Работа с данными", req:["strings_adv"], lessons:[
        { id:"j1", title:"JSON модуль", exercises:[
            { id:"j1-t1", type:"theory", q:"JSON", text:"JSON — формат обмена данными. dumps() — dict в строку. loads() — строку в dict.", code:'import json\ndata = {"name": "Alice", "age": 25}\njson_str = json.dumps(data)\nprint(json_str)\n\nparsed = json.loads(json_str)\nprint(parsed["name"])' },
            { id:"j1-1", type:"choice", q:"dict в JSON строку?", opts:["str(d)","json.loads(d)","json.dumps(d)","d.to_json()"], answer:"json.dumps(d)", xp:10 },
            { id:"j1-2", type:"write", q:"Импортируй json и создай строку из dict", answer:'import json\njson.dumps({"a": 1})', xp:15 },
            { id:"j1-3", type:"choice", q:"JSON строку в dict?", opts:["json.dumps()","json.loads()","dict()","json.parse()"], answer:"json.loads()", xp:10 }
        ]}
    ]},

    { id:"project", title:"Финальный проект", icon:"🏆", desc:"Итоговый проект", req:["json_mod"], lessons:[
        { id:"p1", title:"Поздравляем!", exercises:[
            { id:"p1-t1", type:"theory", q:"Ты прошёл курс Python!", text:"Поздравляем! Ты освоил основы Python. Теперь ты можешь создавать свои проекты!\n\nТы изучил: переменные, условия, циклы, функции, списки, словари, ООП, файлы, исключения, модули и многое другое!" },
            { id:"p1-1", type:"choice", q:"Какой проект создашь первым?", opts:["Telegram-бот","Веб-приложение","Игру","CLI утилиту"], answer:"Telegram-бот", xp:50 }
        ]}
    ]}
];

var JS_SKILLS = [
    { id:"js_basics", title:"Основы JS", icon:"📦", desc:"Переменные, типы", req:[], lessons:[
        { id:"jsb1", title:"Привет, JavaScript!", exercises:[
            { id:"jsb1-t1", type:"theory", q:"Что такое JavaScript?", text:"JavaScript — главный язык веба. Работает в браузере, делает страницы интерактивными. Также работает на сервере (Node.js)." },
            { id:"jsb1-t2", type:"theory", q:"console.log()", text:"console.log() выводит сообщение в консоль разработчика.", code:'console.log("Hello, World!");\nconsole.log(42);\nconsole.log(true);' },
            { id:"jsb1-1", type:"choice", q:"Как вывести текст в консоль?", opts:["print()","console.log()","echo()","write()"], answer:"console.log()", xp:10 },
            { id:"jsb1-2", type:"insert", q:'console.___(\"Hello\");', opts:["log","print","out","write"], answer:"log", xp:10 },
            { id:"jsb1-3", type:"write", q:'Выведи \"Hello\" в консоль', answer:'console.log("Hello");', xp:15 },
            { id:"jsb1-4", type:"fix", q:"Исправь:", code:'consolelog("Hi");', answer:'console.log("Hi");', xp:15 },
            { id:"jsb1-5", type:"choice", q:"JS работает в?", opts:["Только сервере","Только браузере","Везде","Только мобильных"], answer:"Везде", xp:10 }
        ]},
        { id:"jsb2", title:"Переменные", exercises:[
            { id:"jsb2-t1", type:"theory", q:"let и const", text:"let — изменяемая переменная\nconst — константа (нельзя изменить)\nvar — устаревший способ", code:'let age = 25;\nconst name = "Alice";\nage = 26; // OK\n// name = "Bob"; // Ошибка!' },
            { id:"jsb2-1", type:"choice", q:"Ключевое слово для константы?", opts:["var","let","const","final"], answer:"const", xp:10 },
            { id:"jsb2-2", type:"insert", q:'___ name = \"Alice\";', opts:["let","var","const","def"], answer:"let", xp:10 },
            { id:"jsb2-3", type:"write", q:"Создай переменную age = 25", answer:"let age = 25;", xp:15 },
            { id:"jsb2-4", type:"choice", q:"const x = 5; x = 10; — что будет?", opts:["x станет 10","Ошибка","x останется 5","undefined"], answer:"Ошибка", xp:10 },
            { id:"jsb2-5", type:"fix", q:"Исправь:", code:"const x = 5;\nx = 10;", answer:"let x = 5;\nx = 10;", xp:15 }
        ]},
        { id:"jsb3", title:"Типы данных", exercises:[
            { id:"jsb3-t1", type:"theory", q:"Типы в JS", text:"number — числа (42, 3.14)\nstring — строки\nboolean — true/false\nnull — пусто\nundefined — не определено\nobject — объекты", code:'let num = 42;\nlet str = "Hello";\nlet bool = true;\nlet empty = null;\nlet undef = undefined;' },
            { id:"jsb3-1", type:"choice", q:'typeof \"hello\"?', opts:["text","str","string","char"], answer:"string", xp:10 },
            { id:"jsb3-2", type:"choice", q:"typeof 42?", opts:["int","integer","number","num"], answer:"number", xp:10 },
            { id:"jsb3-3", type:"choice", q:"typeof true?", opts:["bool","boolean","bit","logic"], answer:"boolean", xp:10 },
            { id:"jsb3-4", type:"choice", q:"typeof null?", opts:["null","undefined","object","boolean"], answer:"object", xp:10 }
        ]},
        { id:"jsb4", title:"Шаблонные строки", exercises:[
            { id:"jsb4-t1", type:"theory", q:"Template literals", text:"Обратные кавычки `` позволяют вставлять переменные через ${}.", code:'let name = "Alice";\nlet age = 25;\nconsole.log(`Hello, ${name}!`);\nconsole.log(`Age: ${age}`);' },
            { id:"jsb4-1", type:"choice", q:'let x=5; `x = ${x}` выведет?', opts:["x = ${x}","x = x","x = 5","Ошибка"], answer:"x = 5", xp:10 },
            { id:"jsb4-2", type:"insert", q:'let n="Bob"; console.log(`Hi, ___!`)', opts:["${n}","n","{n}","$n"], answer:"${n}", xp:10 },
            { id:"jsb4-3", type:"write", q:"Выведи a + b = сумма через шаблон", answer:'console.log(`${a} + ${b} = ${a+b}`);', xp:15 }
        ]}
    ]},
    { id:"js_conditions", title:"Условия JS", icon:"🔀", desc:"if, else, switch", req:["js_basics"], lessons:[
        { id:"jsc1", title:"if-else", exercises:[
            { id:"jsc1-t1", type:"theory", q:"Условия в JS", text:"if проверяет условие. Блоки кода в фигурных скобках {}.", code:'if (age >= 18) {\n    console.log("Взрослый");\n} else {\n    console.log("Ребёнок");\n}' },
            { id:"jsc1-1", type:"choice", q:"Скобки для блока кода в JS?", opts:["()","[]","{}","<>"], answer:"{}", xp:10 },
            { id:"jsc1-2", type:"insert", q:'if (x > 10) ___ console.log(\"Да\"); }', opts:["{","(","[","<"], answer:"{", xp:10 },
            { id:"jsc1-3", type:"write", q:'Если age >= 18, выведи \"Adult\"', answer:'if (age >= 18) {\n    console.log("Adult");\n}', xp:15 },
            { id:"jsc1-4", type:"choice", q:"=== vs ==?", opts:["Одинаковы","=== строже","== строже","Нет разницы"], answer:"=== строже", xp:10 }
        ]},
        { id:"jsc2", title:"Тернарный оператор", exercises:[
            { id:"jsc2-t1", type:"theory", q:"Тернарный оператор", text:"Короткая форма if-else в одну строку.", code:'let status = age >= 18 ? "adult" : "child";\nlet abs = x >= 0 ? x : -x;' },
            { id:"jsc2-1", type:"choice", q:'x > 5 ? \"да\" : \"нет\" при x=3?', opts:["да","нет","true","false"], answer:"нет", xp:10 },
            { id:"jsc2-2", type:"write", q:"Тернарный: если x > 0 то positive иначе negative", answer:'let result = x > 0 ? "positive" : "negative";', xp:15 },
            { id:"jsc2-3", type:"choice", q:"a ? b : c — если a false?", opts:["a","b","c","undefined"], answer:"c", xp:10 }
        ]},
        { id:"jsc3", title:"switch", exercises:[
            { id:"jsc3-t1", type:"theory", q:"switch", text:"switch — выбор из нескольких вариантов.", code:'switch (color) {\n    case "red":\n        console.log("Красный");\n        break;\n    case "blue":\n        console.log("Синий");\n        break;\n    default:\n        console.log("Другой");\n}' },
            { id:"jsc3-1", type:"choice", q:"Что делает break в switch?", opts:["Выходит из switch","Вызывает ошибку","Пропускает case","Ничего"], answer:"Выходит из switch", xp:10 },
            { id:"jsc3-2", type:"choice", q:"default в switch?", opts:["Обязательный","Если ничего не подошло","Первый case","Ошибка"], answer:"Если ничего не подошло", xp:10 }
        ]}
    ]},
    { id:"js_loops", title:"Циклы JS", icon:"🔄", desc:"for, while, forEach", req:["js_conditions"], lessons:[
        { id:"jsl1", title:"Цикл for", exercises:[
            { id:"jsl1-t1", type:"theory", q:"Цикл for в JS", text:"for содержит: инициализацию, условие, шаг.", code:"for (let i = 0; i < 5; i++) {\n    console.log(i);\n}\n// 0, 1, 2, 3, 4" },
            { id:"jsl1-1", type:"choice", q:"for (let i=0; i<3; i++) выполнится?", opts:["2 раза","3 раза","4 раза","Бесконечно"], answer:"3 раза", xp:10 },
            { id:"jsl1-2", type:"insert", q:"for (let i = 0; i < 5; ___)", opts:["i++","i--","i+1","++i"], answer:"i++", xp:10 },
            { id:"jsl1-3", type:"write", q:"Выведи числа от 1 до 5", answer:"for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}", xp:15 }
        ]},
        { id:"jsl2", title:"while и do-while", exercises:[
            { id:"jsl2-t1", type:"theory", q:"while", text:"while выполняется пока условие true. do-while выполняет хотя бы раз.", code:"let i = 0;\nwhile (i < 3) {\n    console.log(i);\n    i++;\n}\n\ndo {\n    console.log('раз');\n} while (false);" },
            { id:"jsl2-1", type:"choice", q:"do-while выполнится хотя бы?", opts:["0 раз","1 раз","2 раза","Зависит"], answer:"1 раз", xp:10 },
            { id:"jsl2-2", type:"write", q:"Считай от 0 до 4 через while", answer:"let i = 0;\nwhile (i < 5) {\n    console.log(i);\n    i++;\n}", xp:15 }
        ]},
        { id:"jsl3", title:"forEach и map", exercises:[
            { id:"jsl3-t1", type:"theory", q:"Методы массивов", text:"forEach — для каждого элемента\nmap — создаёт новый массив\nfor...of — перебор", code:"[1,2,3].forEach(x => console.log(x));\n\nlet doubled = [1,2,3].map(x => x * 2);\n// [2, 4, 6]\n\nfor (let x of [1,2,3]) {\n    console.log(x);\n}" },
            { id:"jsl3-1", type:"choice", q:"[1,2,3].map(x => x*2)?", opts:["6","[2,4,6]","[1,2,3]","undefined"], answer:"[2,4,6]", xp:10 },
            { id:"jsl3-2", type:"choice", q:"forEach возвращает?", opts:["Массив","undefined","Число","Объект"], answer:"undefined", xp:10 },
            { id:"jsl3-3", type:"write", q:"Удвой каждый элемент [1,2,3]", answer:"[1,2,3].map(x => x * 2);", xp:15 }
        ]}
    ]},
    { id:"js_functions", title:"Функции JS", icon:"⚡", desc:"function, arrow", req:["js_loops"], lessons:[
        { id:"jsf1", title:"Обычные функции", exercises:[
            { id:"jsf1-t1", type:"theory", q:"function", text:"function объявляет функцию. return возвращает значение.", code:'function greet(name) {\n    return "Hello, " + name;\n}\nconsole.log(greet("Alice")); // Hello, Alice' },
            { id:"jsf1-1", type:"choice", q:"Как объявить функцию?", opts:["def greet()","function greet()","func greet()","fn greet()"], answer:"function greet()", xp:10 },
            { id:"jsf1-2", type:"write", q:"Функция add(a, b) возвращает сумму", answer:"function add(a, b) {\n    return a + b;\n}", xp:15 },
            { id:"jsf1-3", type:"choice", q:"Функция без return возвращает?", opts:["0","null","undefined","false"], answer:"undefined", xp:10 },
            { id:"jsf1-4", type:"write", q:"Функция isPositive(n) — true если n > 0", answer:"function isPositive(n) {\n    return n > 0;\n}", xp:15 }
        ]},
        { id:"jsf2", title:"Arrow функции", exercises:[
            { id:"jsf2-t1", type:"theory", q:"Стрелочные функции", text:"Короткий синтаксис через =>. Если одно выражение — return не нужен.", code:"const add = (a, b) => a + b;\nconst square = x => x * x;\nconst hello = () => console.log('Hi');" },
            { id:"jsf2-1", type:"choice", q:"const f = x => x*2; f(5)?", opts:["5","10","x*2","undefined"], answer:"10", xp:10 },
            { id:"jsf2-2", type:"insert", q:"const double = x ___ x * 2;", opts:["=>",":","->"," ="], answer:"=>", xp:10 },
            { id:"jsf2-3", type:"write", q:"Arrow функция triple(x) = x * 3", answer:"const triple = x => x * 3;", xp:15 },
            { id:"jsf2-4", type:"choice", q:"() => {} — параметров?", opts:["0","1","2","Ошибка"], answer:"0", xp:10 }
        ]},
        { id:"jsf3", title:"Замыкания", exercises:[
            { id:"jsf3-t1", type:"theory", q:"Замыкания", text:"Функция запоминает переменные из внешней области видимости.", code:"function counter() {\n    let count = 0;\n    return function() {\n        count++;\n        return count;\n    };\n}\nconst c = counter();\nconsole.log(c()); // 1\nconsole.log(c()); // 2" },
            { id:"jsf3-1", type:"choice", q:"Замыкание помнит?", opts:["Только свои переменные","Внешние переменные","Глобальные","Ничего"], answer:"Внешние переменные", xp:10 },
            { id:"jsf3-2", type:"choice", q:"counter() вызван дважды — count?", opts:["0","1","2","undefined"], answer:"2", xp:10 }
        ]}
    ]},
    { id:"js_arrays", title:"Массивы JS", icon:"📋", desc:"Array методы", req:["js_functions"], lessons:[
        { id:"jsa1", title:"Массивы", exercises:[
            { id:"jsa1-t1", type:"theory", q:"Массивы", text:"Массив — упорядоченный список. Индексация с 0.", code:'const fruits = ["apple", "banana"];\nconsole.log(fruits[0]); // apple\nconsole.log(fruits.length); // 2' },
            { id:"jsa1-1", type:"choice", q:"[1,2,3][0]?", opts:["1","2","3","[1]"], answer:"1", xp:10 },
            { id:"jsa1-2", type:"write", q:"Создай массив [1, 2, 3]", answer:"const arr = [1, 2, 3];", xp:15 },
            { id:"jsa1-3", type:"choice", q:"[1,2,3].length?", opts:["2","3","4","undefined"], answer:"3", xp:10 }
        ]},
        { id:"jsa2", title:"Методы массивов", exercises:[
            { id:"jsa2-t1", type:"theory", q:"push, pop, shift", text:"push() — в конец\npop() — удалить последний\nshift() — удалить первый\nunshift() — в начало", code:"let arr = [1, 2];\narr.push(3);    // [1, 2, 3]\narr.pop();      // [1, 2]\narr.unshift(0); // [0, 1, 2]" },
            { id:"jsa2-1", type:"choice", q:"Как добавить в конец?", opts:["arr.add()","arr.push()","arr.append()","arr.insert()"], answer:"arr.push()", xp:10 },
            { id:"jsa2-2", type:"choice", q:"arr.shift() удаляет?", opts:["Последний","Первый","Все","Ничего"], answer:"Первый", xp:10 },
            { id:"jsa2-3", type:"write", q:"Добавь 4 в конец arr", answer:"arr.push(4);", xp:10 }
        ]},
        { id:"jsa3", title:"filter, reduce, find", exercises:[
            { id:"jsa3-t1", type:"theory", q:"filter, reduce, find", text:"filter — отфильтровать\nreduce — свернуть в значение\nfind — найти первый", code:"[1,2,3,4].filter(x => x > 2); // [3, 4]\n[1,2,3,4].reduce((s, x) => s + x, 0); // 10\n[1,2,3].find(x => x > 1); // 2" },
            { id:"jsa3-1", type:"choice", q:"[1,2,3].filter(x => x>1)?", opts:["[2,3]","[1]","3","true"], answer:"[2,3]", xp:10 },
            { id:"jsa3-2", type:"choice", q:"[1,2,3].find(x => x>1)?", opts:["[2,3]","2","3","true"], answer:"2", xp:10 },
            { id:"jsa3-3", type:"write", q:"Сумма [1,2,3,4] через reduce", answer:"[1,2,3,4].reduce((s, x) => s + x, 0);", xp:20 },
            { id:"jsa3-4", type:"choice", q:"[1,2,3].includes(2)?", opts:["true","false","2","1"], answer:"true", xp:10 }
        ]},
        { id:"jsa4", title:"Деструктуризация и spread", exercises:[
            { id:"jsa4-t1", type:"theory", q:"Деструктуризация", text:"Извлечение значений из массивов и объектов.", code:"const [a, b] = [1, 2];\nconst [first, ...rest] = [1, 2, 3, 4];\n// first = 1, rest = [2, 3, 4]\n\nconst merged = [...[1,2], ...[3,4]];\n// [1, 2, 3, 4]" },
            { id:"jsa4-1", type:"choice", q:"const [a, b] = [1, 2]; a?", opts:["[1,2]","1","2","undefined"], answer:"1", xp:10 },
            { id:"jsa4-2", type:"choice", q:"[...a, ...b] — что делает?", opts:["Копирует","Объединяет","Удаляет","Сортирует"], answer:"Объединяет", xp:10 }
        ]}
    ]},
    { id:"js_objects", title:"Объекты JS", icon:"📦", desc:"Object, this", req:["js_arrays"], lessons:[
        { id:"jso1", title:"Объекты", exercises:[
            { id:"jso1-t1", type:"theory", q:"Объекты в JS", text:"Объект — набор пар ключ-значение. Создаётся через {} литерал.", code:'const person = {\n    name: "Alice",\n    age: 25,\n    greet() {\n        console.log(`Hi, ${this.name}!`);\n    }\n};\nperson.greet(); // Hi, Alice!' },
            { id:"jso1-1", type:"choice", q:'person.name если name="Alice"?', opts:["name","Alice","undefined","error"], answer:"Alice", xp:10 },
            { id:"jso1-2", type:"write", q:"Создай объект с name и age", answer:'const obj = { name: "Bob", age: 30 };', xp:15 },
            { id:"jso1-3", type:"choice", q:"this в методе объекта — это?", opts:["window","undefined","Сам объект","Функция"], answer:"Сам объект", xp:10 }
        ]},
        { id:"jso2", title:"Деструктуризация объектов", exercises:[
            { id:"jso2-t1", type:"theory", q:"Деструктуризация", text:"Извлечение свойств объекта в переменные.", code:'const { name, age } = { name: "Alice", age: 25 };\nconsole.log(name); // Alice\n\nconst { x, ...rest } = { x: 1, y: 2, z: 3 };\n// rest = { y: 2, z: 3 }' },
            { id:"jso2-1", type:"choice", q:'const { a } = { a: 1 }; a?', opts:["{ a: 1 }","1","undefined","Ошибка"], answer:"1", xp:10 },
            { id:"jso2-2", type:"write", q:"Извлеки name и age из person", answer:"const { name, age } = person;", xp:15 }
        ]},
        { id:"jso3", title:"Классы", exercises:[
            { id:"jso3-t1", type:"theory", q:"Классы в JS", text:"class — синтаксический сахар для прототипов.", code:'class Animal {\n    constructor(name) {\n        this.name = name;\n    }\n    speak() {\n        console.log(`${this.name} speaks`);\n    }\n}\n\nconst dog = new Animal("Rex");\ndog.speak();' },
            { id:"jso3-1", type:"choice", q:"Конструктор в классе JS?", opts:["init()","__init__()","constructor()","new()"], answer:"constructor()", xp:10 },
            { id:"jso3-2", type:"insert", q:"class Dog { ___(name) { this.name = name; } }", opts:["constructor","init","create","build"], answer:"constructor", xp:10 },
            { id:"jso3-3", type:"choice", q:"Как создать экземпляр?", opts:["Dog()","new Dog()","create Dog()","Dog.new()"], answer:"new Dog()", xp:10 }
        ]}
    ]},
    { id:"js_async", title:"Async JS", icon:"⏳", desc:"Promise, async/await", req:["js_objects"], lessons:[
        { id:"jsas1", title:"Promise", exercises:[
            { id:"jsas1-t1", type:"theory", q:"Promise", text:"Promise — объект для асинхронных операций. Может быть: pending, fulfilled, rejected.", code:'const p = new Promise((resolve, reject) => {\n    setTimeout(() => resolve("Done!"), 1000);\n});\n\np.then(result => console.log(result))\n .catch(err => console.error(err));' },
            { id:"jsas1-1", type:"choice", q:"Метод для обработки ошибки?", opts:[".then()",".catch()",".error()",".fail()"], answer:".catch()", xp:10 },
            { id:"jsas1-2", type:"choice", q:"Promise.all() ждёт?", opts:["Первый","Последний","Все","Любой"], answer:"Все", xp:10 },
            { id:"jsas1-3", type:"choice", q:".then() вызывается при?", opts:["Ошибке","Успехе","Всегда","Таймауте"], answer:"Успехе", xp:10 }
        ]},
        { id:"jsas2", title:"async/await", exercises:[
            { id:"jsas2-t1", type:"theory", q:"async/await", text:"async делает функцию асинхронной. await ждёт результат Promise.", code:"async function getData() {\n    try {\n        const response = await fetch(url);\n        const data = await response.json();\n        return data;\n    } catch (error) {\n        console.error(error);\n    }\n}" },
            { id:"jsas2-1", type:"insert", q:"___ function getData() { ... }", opts:["async","await","promise","sync"], answer:"async", xp:10 },
            { id:"jsas2-2", type:"choice", q:"await можно использовать?", opts:["Везде","В async функции","В цикле","В if"], answer:"В async функции", xp:10 },
            { id:"jsas2-3", type:"write", q:"Асинхронная функция fetchData", answer:"async function fetchData() {\n    const res = await fetch(url);\n    return await res.json();\n}", xp:20 }
        ]}
    ]},
    { id:"js_dom", title:"DOM", icon:"🌐", desc:"Работа с HTML", req:["js_async"], lessons:[
        { id:"jsd1", title:"Выбор элементов", exercises:[
            { id:"jsd1-t1", type:"theory", q:"DOM", text:"DOM — Document Object Model. JS может находить и изменять HTML элементы.", code:'document.getElementById("myId");\ndocument.querySelector(".myClass");\ndocument.querySelectorAll("p");' },
            { id:"jsd1-1", type:"choice", q:"Как выбрать по ID?", opts:["getById()","getElementById()","selectId()","findId()"], answer:"getElementById()", xp:10 },
            { id:"jsd1-2", type:"choice", q:"querySelector выбирает?", opts:["Все","Первый","Последний","Случайный"], answer:"Первый", xp:10 },
            { id:"jsd1-3", type:"insert", q:'document.___(".btn")', opts:["querySelector","getElement","find","select"], answer:"querySelector", xp:10 }
        ]},
        { id:"jsd2", title:"Изменение и события", exercises:[
            { id:"jsd2-t1", type:"theory", q:"Изменение DOM и события", text:"textContent — текст элемента\nstyle — CSS стили\naddEventListener — обработчик событий", code:'const btn = document.querySelector("#btn");\nbtn.textContent = "Click me";\nbtn.style.color = "red";\nbtn.addEventListener("click", () => {\n    alert("Clicked!");\n});' },
            { id:"jsd2-1", type:"choice", q:"Как изменить текст?", opts:["el.text","el.textContent","el.value","el.content"], answer:"el.textContent", xp:10 },
            { id:"jsd2-2", type:"choice", q:"Событие клика?", opts:["onclick","click","press","tap"], answer:"click", xp:10 },
            { id:"jsd2-3", type:"write", q:"Добавь обработчик клика", answer:'btn.addEventListener("click", () => {\n    console.log("clicked");\n});', xp:15 }
        ]}
    ]},
    { id:"js_modules", title:"Модули JS", icon:"📦", desc:"import/export", req:["js_dom"], lessons:[
        { id:"jsm1", title:"ES Modules", exercises:[
            { id:"jsm1-t1", type:"theory", q:"import/export", text:"export — экспорт из модуля\nimport — импорт в модуль\nexport default — экспорт по умолчанию", code:'// math.js\nexport function add(a, b) { return a + b; }\nexport const PI = 3.14;\n\n// main.js\nimport { add, PI } from "./math.js";\nconsole.log(add(2, 3));' },
            { id:"jsm1-1", type:"choice", q:"Как импортировать функцию?", opts:["require()","import","include","using"], answer:"import", xp:10 },
            { id:"jsm1-2", type:"insert", q:'___ { add } from \"./math.js\";', opts:["import","require","include","from"], answer:"import", xp:10 }
        ]}
    ]}
];

var HTML_SKILLS = [
    { id:"html_basics", title:"Основы HTML", icon:"📄", desc:"Теги, структура", req:[], lessons:[
        { id:"hb1", title:"Что такое HTML?", exercises:[
            { id:"hb1-t1", type:"theory", q:"HTML", text:"HTML (HyperText Markup Language) — язык разметки для веб-страниц. Описывает структуру с помощью тегов." },
            { id:"hb1-t2", type:"theory", q:"Теги", text:"Тег — элемент разметки. Большинство парные: открывающий и закрывающий.", code:"<p>Это параграф</p>\n<h1>Это заголовок</h1>\n<br> <!-- самозакрывающийся -->" },
            { id:"hb1-1", type:"choice", q:"Как закрыть тег <p>?", opts:["</p>","<p/>","[/p]","<end p>"], answer:"</p>", xp:10 },
            { id:"hb1-2", type:"insert", q:"<___>Заголовок</h1>", opts:["h1","head","title","header"], answer:"h1", xp:10 },
            { id:"hb1-3", type:"choice", q:"HTML — это?", opts:["Язык программирования","Язык разметки","База данных","Стили"], answer:"Язык разметки", xp:10 },
            { id:"hb1-4", type:"choice", q:"<br> нужно закрывать?", opts:["Да","Нет","Иногда","Обязательно"], answer:"Нет", xp:10 }
        ]},
        { id:"hb2", title:"Структура документа", exercises:[
            { id:"hb2-t1", type:"theory", q:"Структура HTML", text:"DOCTYPE объявляет тип документа.\n<html> — корневой элемент\n<head> — метаданные\n<body> — контент страницы", code:'<!DOCTYPE html>\n<html>\n<head>\n    <title>Мой сайт</title>\n</head>\n<body>\n    <h1>Привет!</h1>\n</body>\n</html>' },
            { id:"hb2-1", type:"choice", q:"Где контент страницы?", opts:["<head>","<body>","<html>","<title>"], answer:"<body>", xp:10 },
            { id:"hb2-2", type:"choice", q:"Заголовок вкладки?", opts:["<h1>","<title>","<header>","<head>"], answer:"<title>", xp:10 },
            { id:"hb2-3", type:"choice", q:"DOCTYPE нужен?", opts:["Нет","Да","Иногда","Устарел"], answer:"Да", xp:10 }
        ]},
        { id:"hb3", title:"Текстовые теги", exercises:[
            { id:"hb3-t1", type:"theory", q:"Текстовые теги", text:"<h1>-<h6> — заголовки (h1 самый большой)\n<p> — параграф\n<b> / <strong> — жирный\n<i> / <em> — курсив\n<br> — перенос строки", code:"<h1>Заголовок 1</h1>\n<h2>Заголовок 2</h2>\n<p>Параграф с <b>жирным</b> и <i>курсивом</i></p>" },
            { id:"hb3-1", type:"choice", q:"Самый большой заголовок?", opts:["<h6>","<h1>","<h0>","<header>"], answer:"<h1>", xp:10 },
            { id:"hb3-2", type:"choice", q:"Тег для жирного текста?", opts:["<bold>","<b>","<fat>","<thick>"], answer:"<b>", xp:10 },
            { id:"hb3-3", type:"insert", q:"<___>Важный текст</strong>", opts:["strong","bold","important","b"], answer:"strong", xp:10 },
            { id:"hb3-4", type:"choice", q:"<p> — это?", opts:["Параграф","Картинка","Ссылка","Список"], answer:"Параграф", xp:10 }
        ]}
    ]},
    { id:"html_links", title:"Ссылки и медиа", icon:"🔗", desc:"a, img, video", req:["html_basics"], lessons:[
        { id:"hl1", title:"Ссылки", exercises:[
            { id:"hl1-t1", type:"theory", q:"Тег <a>", text:"<a> создаёт гиперссылку. href — адрес. target — где открыть.", code:'<a href="https://google.com">Google</a>\n<a href="page2.html" target="_blank">Новая вкладка</a>' },
            { id:"hl1-1", type:"choice", q:"Атрибут для адреса ссылки?", opts:["src","link","href","url"], answer:"href", xp:10 },
            { id:"hl1-2", type:"choice", q:'target="_blank" делает?', opts:["Закрывает","Открывает в новой вкладке","Скрывает","Удаляет"], answer:"Открывает в новой вкладке", xp:10 },
            { id:"hl1-3", type:"insert", q:'<a ___="https://example.com">Ссылка</a>', opts:["href","src","link","url"], answer:"href", xp:10 }
        ]},
        { id:"hl2", title:"Изображения", exercises:[
            { id:"hl2-t1", type:"theory", q:"Тег <img>", text:"<img> вставляет изображение. src — путь. alt — описание (для SEO и доступности).", code:'<img src="photo.jpg" alt="Фото кота">\n<img src="logo.png" alt="Логотип" width="200">' },
            { id:"hl2-1", type:"choice", q:"Атрибут для пути к картинке?", opts:["href","src","path","url"], answer:"src", xp:10 },
            { id:"hl2-2", type:"choice", q:"alt нужен для?", opts:["Стилей","Доступности","Анимации","Ссылок"], answer:"Доступности", xp:10 },
            { id:"hl2-3", type:"choice", q:"<img> — парный тег?", opts:["Да","Нет","Иногда","Зависит"], answer:"Нет", xp:10 }
        ]},
        { id:"hl3", title:"Аудио и видео", exercises:[
            { id:"hl3-t1", type:"theory", q:"Медиа теги", text:"<video> — видео\n<audio> — аудио\ncontrols — показать управление", code:'<video src="video.mp4" controls width="400"></video>\n<audio src="music.mp3" controls></audio>' },
            { id:"hl3-1", type:"choice", q:"Атрибут для панели управления?", opts:["panel","controls","player","ui"], answer:"controls", xp:10 }
        ]}
    ]},
    { id:"html_lists", title:"Списки и таблицы", icon:"📋", desc:"ul, ol, table", req:["html_links"], lessons:[
        { id:"hli1", title:"Списки", exercises:[
            { id:"hli1-t1", type:"theory", q:"Списки HTML", text:"<ul> — маркированный (точки)\n<ol> — нумерованный (1, 2, 3)\n<li> — элемент списка", code:"<ul>\n    <li>Яблоко</li>\n    <li>Банан</li>\n</ul>\n<ol>\n    <li>Первый</li>\n    <li>Второй</li>\n</ol>" },
            { id:"hli1-1", type:"choice", q:"Тег для элемента списка?", opts:["<item>","<li>","<el>","<list>"], answer:"<li>", xp:10 },
            { id:"hli1-2", type:"choice", q:"<ol> создаёт?", opts:["Маркированный","Нумерованный","Таблицу","Форму"], answer:"Нумерованный", xp:10 },
            { id:"hli1-3", type:"insert", q:"<___>\n  <li>Пункт</li>\n</ul>", opts:["ul","ol","list","menu"], answer:"ul", xp:10 }
        ]},
        { id:"hli2", title:"Таблицы", exercises:[
            { id:"hli2-t1", type:"theory", q:"Таблицы", text:"<table> — таблица\n<tr> — строка\n<th> — заголовок ячейки\n<td> — ячейка данных", code:"<table>\n    <tr>\n        <th>Имя</th>\n        <th>Возраст</th>\n    </tr>\n    <tr>\n        <td>Алиса</td>\n        <td>25</td>\n    </tr>\n</table>" },
            { id:"hli2-1", type:"choice", q:"Тег для строки таблицы?", opts:["<row>","<tr>","<line>","<tl>"], answer:"<tr>", xp:10 },
            { id:"hli2-2", type:"choice", q:"<th> vs <td>?", opts:["Одинаковы","th — заголовок","td — заголовок","Нет разницы"], answer:"th — заголовок", xp:10 }
        ]}
    ]},
    { id:"html_forms", title:"Формы", icon:"📝", desc:"input, form, button", req:["html_lists"], lessons:[
        { id:"hf1", title:"Формы и ввод", exercises:[
            { id:"hf1-t1", type:"theory", q:"Формы", text:"<form> — контейнер формы\n<input> — поле ввода\n<textarea> — многострочное поле\n<select> — выпадающий список\n<button> — кнопка", code:'<form action="/submit" method="POST">\n    <input type="text" placeholder="Имя">\n    <input type="email" placeholder="Email">\n    <input type="password" placeholder="Пароль">\n    <button type="submit">Отправить</button>\n</form>' },
            { id:"hf1-1", type:"choice", q:'type="password" делает?', opts:["Шифрует","Скрывает символы","Проверяет","Отправляет"], answer:"Скрывает символы", xp:10 },
            { id:"hf1-2", type:"choice", q:"Какой тип для email?", opts:["text","mail","email","message"], answer:"email", xp:10 },
            { id:"hf1-3", type:"insert", q:'<input type="___" placeholder="Имя">', opts:["text","string","input","field"], answer:"text", xp:10 },
            { id:"hf1-4", type:"choice", q:"<textarea> — для?", opts:["Кнопки","Многострочного ввода","Картинки","Ссылки"], answer:"Многострочного ввода", xp:10 }
        ]},
        { id:"hf2", title:"Типы input", exercises:[
            { id:"hf2-t1", type:"theory", q:"Типы полей", text:"text — текст\npassword — пароль\nnumber — число\ncheckbox — галочка\nradio — переключатель\ndate — дата\ncolor — цвет", code:'<input type="number" min="0" max="100">\n<input type="checkbox" checked>\n<input type="date">\n<input type="color" value="#ff0000">' },
            { id:"hf2-1", type:"choice", q:'type="number" — для?', opts:["Текста","Чисел","Телефона","Пароля"], answer:"Чисел", xp:10 },
            { id:"hf2-2", type:"choice", q:"checkbox — это?", opts:["Текстовое поле","Галочка","Кнопка","Список"], answer:"Галочка", xp:10 }
        ]}
    ]},
    { id:"html_semantic", title:"Семантика", icon:"🏗️", desc:"header, nav, section", req:["html_forms"], lessons:[
        { id:"hs1", title:"Семантические теги", exercises:[
            { id:"hs1-t1", type:"theory", q:"Семантика HTML5", text:"Семантические теги описывают смысл контента:\n<header> — шапка\n<nav> — навигация\n<main> — основной контент\n<section> — секция\n<article> — статья\n<footer> — подвал", code:"<header>\n    <nav>Меню</nav>\n</header>\n<main>\n    <section>\n        <article>Статья</article>\n    </section>\n</main>\n<footer>Подвал</footer>" },
            { id:"hs1-1", type:"choice", q:"Тег для навигации?", opts:["<menu>","<nav>","<links>","<navigation>"], answer:"<nav>", xp:10 },
            { id:"hs1-2", type:"choice", q:"Тег для подвала?", opts:["<bottom>","<footer>","<end>","<base>"], answer:"<footer>", xp:10 }
        ]}
    ]},
    { id:"css_basics", title:"CSS Основы", icon:"🎨", desc:"Селекторы, свойства", req:["html_semantic"], lessons:[
        { id:"cb1", title:"Что такое CSS?", exercises:[
            { id:"cb1-t1", type:"theory", q:"CSS", text:"CSS (Cascading Style Sheets) — язык стилей. Определяет как выглядят HTML элементы.", code:"p {\n    color: blue;\n    font-size: 16px;\n    margin: 10px;\n}\n\n.highlight {\n    background: yellow;\n}\n\n#main {\n    width: 800px;\n}" },
            { id:"cb1-1", type:"choice", q:"Свойство для цвета текста?", opts:["text-color","font-color","color","text"], answer:"color", xp:10 },
            { id:"cb1-2", type:"insert", q:"p { ___: red; }", opts:["color","text","font","style"], answer:"color", xp:10 },
            { id:"cb1-3", type:"choice", q:"Селектор класса?", opts:["#class",".class","@class","*class"], answer:".class", xp:10 },
            { id:"cb1-4", type:"choice", q:"Селектор ID?", opts:["#id",".id","@id","*id"], answer:"#id", xp:10 },
            { id:"cb1-5", type:"choice", q:"font-size меняет?", opts:["Цвет","Размер шрифта","Жирность","Отступ"], answer:"Размер шрифта", xp:10 }
        ]},
        { id:"cb2", title:"Цвета и фоны", exercises:[
            { id:"cb2-t1", type:"theory", q:"Цвета в CSS", text:"Именованные: red, blue\nHEX: #ff0000\nRGB: rgb(255, 0, 0)\nRGBA: rgba(255, 0, 0, 0.5)", code:".box {\n    color: #333;\n    background-color: rgb(240, 240, 240);\n    border-color: rgba(0, 0, 0, 0.2);\n}" },
            { id:"cb2-1", type:"choice", q:"#ff0000 — какой цвет?", opts:["Синий","Красный","Зелёный","Белый"], answer:"Красный", xp:10 },
            { id:"cb2-2", type:"choice", q:"rgba — что такое a?", opts:["Цвет","Прозрачность","Яркость","Насыщенность"], answer:"Прозрачность", xp:10 }
        ]}
    ]},
    { id:"css_box", title:"Box Model", icon:"📦", desc:"margin, padding, border", req:["css_basics"], lessons:[
        { id:"cbx1", title:"Box Model", exercises:[
            { id:"cbx1-t1", type:"theory", q:"Box Model", text:"Каждый элемент — это коробка:\ncontent — контент\npadding — внутренний отступ\nborder — рамка\nmargin — внешний отступ", code:".box {\n    width: 200px;\n    padding: 20px;\n    border: 2px solid #333;\n    margin: 10px;\n    box-sizing: border-box;\n}" },
            { id:"cbx1-1", type:"choice", q:"padding — это?", opts:["Внешний отступ","Внутренний отступ","Рамка","Ширина"], answer:"Внутренний отступ", xp:10 },
            { id:"cbx1-2", type:"choice", q:"margin — это?", opts:["Внешний отступ","Внутренний отступ","Рамка","Высота"], answer:"Внешний отступ", xp:10 },
            { id:"cbx1-3", type:"choice", q:"box-sizing: border-box?", opts:["Игнорирует padding","Включает padding в width","Убирает border","Центрирует"], answer:"Включает padding в width", xp:10 }
        ]}
    ]},
    { id:"css_flexbox", title:"Flexbox", icon:"📐", desc:"Гибкая раскладка", req:["css_box"], lessons:[
        { id:"cfx1", title:"Flexbox", exercises:[
            { id:"cfx1-t1", type:"theory", q:"Flexbox", text:"Flexbox — система для раскладки элементов в одном измерении (строка или столбец).", code:".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n    flex-direction: row;\n}" },
            { id:"cfx1-1", type:"choice", q:"Как включить flexbox?", opts:["display: flex","flex: true","flexbox: on","layout: flex"], answer:"display: flex", xp:10 },
            { id:"cfx1-2", type:"choice", q:"justify-content выравнивает?", opts:["По вертикали","По горизонтали","По диагонали","По Z-оси"], answer:"По горизонтали", xp:10 },
            { id:"cfx1-3", type:"choice", q:"align-items выравнивает?", opts:["По горизонтали","По вертикали","По диагонали","По Z-оси"], answer:"По вертикали", xp:10 },
            { id:"cfx1-4", type:"choice", q:"gap: 10px — это?", opts:["Отступ между элементами","Внешний отступ","Внутренний отступ","Рамка"], answer:"Отступ между элементами", xp:10 }
        ]},
        { id:"cfx2", title:"Grid", exercises:[
            { id:"cfx2-t1", type:"theory", q:"CSS Grid", text:"Grid — система для двумерной раскладки (строки и столбцы).", code:".grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-gap: 10px;\n}" },
            { id:"cfx2-1", type:"choice", q:"Как включить grid?", opts:["display: grid","grid: true","layout: grid","grid: on"], answer:"display: grid", xp:10 },
            { id:"cfx2-2", type:"choice", q:"1fr означает?", opts:["1 пиксель","1 доля","1 процент","1 rem"], answer:"1 доля", xp:10 }
        ]}
    ]},
    { id:"css_responsive", title:"Адаптивность", icon:"📱", desc:"media queries", req:["css_flexbox"], lessons:[
        { id:"cr1", title:"Media queries", exercises:[
            { id:"cr1-t1", type:"theory", q:"Адаптивный дизайн", text:"Media queries позволяют менять стили в зависимости от размера экрана.", code:"@media (max-width: 768px) {\n    .container {\n        flex-direction: column;\n    }\n    .sidebar {\n        display: none;\n    }\n}" },
            { id:"cr1-1", type:"choice", q:"max-width: 768px — когда?", opts:["Экран > 768px","Экран <= 768px","Всегда","Никогда"], answer:"Экран <= 768px", xp:10 },
            { id:"cr1-2", type:"choice", q:"Для мобильных обычно?", opts:["max-width: 1200px","max-width: 768px","min-width: 768px","min-width: 1200px"], answer:"max-width: 768px", xp:10 }
        ]}
    ]}
];

var SQL_SKILLS = [
    { id:"sql_basics", title:"Основы SQL", icon:"📊", desc:"SELECT, WHERE", req:[], lessons:[
        { id:"sb1", title:"Что такое SQL?", exercises:[
            { id:"sb1-t1", type:"theory", q:"SQL", text:"SQL (Structured Query Language) — язык для работы с базами данных. Позволяет хранить, искать и изменять данные." },
            { id:"sb1-t2", type:"theory", q:"Таблицы", text:"Данные хранятся в таблицах — как в Excel. Строки = записи, столбцы = поля.", code:"users:\n| id | name    | age | city    |\n|----|---------|-----|---------|  \n| 1  | Alice   | 25  | Moscow  |\n| 2  | Bob     | 30  | London  |" },
            { id:"sb1-t3", type:"theory", q:"SELECT", text:"SELECT выбирает данные из таблицы. * означает все столбцы.", code:"SELECT * FROM users;\nSELECT name, age FROM users;" },
            { id:"sb1-1", type:"choice", q:"Как выбрать все столбцы?", opts:["SELECT all","SELECT *","SELECT @","SELECT #"], answer:"SELECT *", xp:10 },
            { id:"sb1-2", type:"insert", q:"___ name FROM users;", opts:["SELECT","GET","FIND","FETCH"], answer:"SELECT", xp:10 },
            { id:"sb1-3", type:"write", q:"Выбери все данные из таблицы users", answer:"SELECT * FROM users;", xp:15 },
            { id:"sb1-4", type:"choice", q:"SQL — регистрозависимый?", opts:["Да","Нет","Для ключевых слов","Зависит"], answer:"Нет", xp:10 }
        ]},
        { id:"sb2", title:"WHERE", exercises:[
            { id:"sb2-t1", type:"theory", q:"WHERE", text:"WHERE фильтрует строки по условию. Используется с операторами сравнения: =, >, <, >=, <=, <>", code:"SELECT * FROM users WHERE age > 18;\nSELECT * FROM users WHERE name = 'Alice';\nSELECT * FROM users WHERE age >= 25 AND city = 'Moscow';" },
            { id:"sb2-1", type:"choice", q:"Как фильтровать по возрасту?", opts:["WHERE age > 18","IF age > 18","FILTER age > 18","WHEN age > 18"], answer:"WHERE age > 18", xp:10 },
            { id:"sb2-2", type:"write", q:"Выбери users где age = 25", answer:"SELECT * FROM users WHERE age = 25;", xp:15 },
            { id:"sb2-3", type:"choice", q:"<> в SQL означает?", opts:["Меньше или больше","Не равно","Примерно","Ошибка"], answer:"Не равно", xp:10 },
            { id:"sb2-4", type:"write", q:"Выбери users из Moscow", answer:"SELECT * FROM users WHERE city = 'Moscow';", xp:15 }
        ]},
        { id:"sb3", title:"ORDER BY и LIMIT", exercises:[
            { id:"sb3-t1", type:"theory", q:"Сортировка и ограничение", text:"ORDER BY — сортировка (ASC по возрастанию, DESC по убыванию)\nLIMIT — ограничение количества строк", code:"SELECT * FROM users ORDER BY age DESC;\nSELECT * FROM users ORDER BY name ASC;\nSELECT * FROM users LIMIT 5;" },
            { id:"sb3-1", type:"choice", q:"ORDER BY age DESC — это?", opts:["По возрастанию","По убыванию","Случайно","По алфавиту"], answer:"По убыванию", xp:10 },
            { id:"sb3-2", type:"write", q:"Выбери 10 самых молодых users", answer:"SELECT * FROM users ORDER BY age ASC LIMIT 10;", xp:15 },
            { id:"sb3-3", type:"choice", q:"LIMIT 5 — что делает?", opts:["5 столбцов","Первые 5 строк","Пропустить 5","5 таблиц"], answer:"Первые 5 строк", xp:10 }
        ]},
        { id:"sb4", title:"LIKE и IN", exercises:[
            { id:"sb4-t1", type:"theory", q:"LIKE и IN", text:"LIKE — поиск по шаблону (% — любые символы)\nIN — проверка вхождения в список", code:"SELECT * FROM users WHERE name LIKE 'A%';\nSELECT * FROM users WHERE city IN ('Moscow', 'London');\nSELECT * FROM users WHERE name LIKE '%son';" },
            { id:"sb4-1", type:"choice", q:"LIKE 'A%' найдёт?", opts:["Alice","Bob","Charlie","Dan"], answer:"Alice", xp:10 },
            { id:"sb4-2", type:"choice", q:"% в LIKE означает?", opts:["Один символ","Любые символы","Процент","Ничего"], answer:"Любые символы", xp:10 },
            { id:"sb4-3", type:"write", q:"Найди users из Moscow или London", answer:"SELECT * FROM users WHERE city IN ('Moscow', 'London');", xp:15 }
        ]}
    ]},
    { id:"sql_crud", title:"CRUD", icon:"✏️", desc:"INSERT, UPDATE, DELETE", req:["sql_basics"], lessons:[
        { id:"sc1", title:"INSERT", exercises:[
            { id:"sc1-t1", type:"theory", q:"INSERT", text:"INSERT добавляет новую строку в таблицу.", code:"INSERT INTO users (name, age, city)\nVALUES ('Charlie', 28, 'Paris');\n\nINSERT INTO users (name, age)\nVALUES ('Diana', 22);" },
            { id:"sc1-1", type:"insert", q:"___ INTO users (name) VALUES ('Bob');", opts:["INSERT","ADD","CREATE","PUT"], answer:"INSERT", xp:10 },
            { id:"sc1-2", type:"write", q:"Добавь Alice, 25 лет, Moscow", answer:"INSERT INTO users (name, age, city) VALUES ('Alice', 25, 'Moscow');", xp:15 },
            { id:"sc1-3", type:"choice", q:"VALUES содержит?", opts:["Имена столбцов","Значения","Условия","Таблицы"], answer:"Значения", xp:10 }
        ]},
        { id:"sc2", title:"UPDATE", exercises:[
            { id:"sc2-t1", type:"theory", q:"UPDATE", text:"UPDATE изменяет существующие строки. ВСЕГДА используй WHERE!", code:"UPDATE users SET age = 26 WHERE name = 'Alice';\nUPDATE users SET city = 'Berlin', age = 31 WHERE id = 2;" },
            { id:"sc2-1", type:"choice", q:"Ключевое слово для изменения?", opts:["CHANGE","MODIFY","UPDATE","ALTER"], answer:"UPDATE", xp:10 },
            { id:"sc2-2", type:"write", q:"Измени возраст Alice на 26", answer:"UPDATE users SET age = 26 WHERE name = 'Alice';", xp:15 },
            { id:"sc2-3", type:"choice", q:"UPDATE без WHERE?", opts:["Ошибка","Изменит первую","Изменит ВСЕ","Ничего"], answer:"Изменит ВСЕ", xp:10 }
        ]},
        { id:"sc3", title:"DELETE", exercises:[
            { id:"sc3-t1", type:"theory", q:"DELETE", text:"DELETE удаляет строки. ВСЕГДА используй WHERE!", code:"DELETE FROM users WHERE id = 5;\nDELETE FROM users WHERE age < 18;\n-- ОПАСНО: DELETE FROM users; -- удалит ВСЁ!" },
            { id:"sc3-1", type:"choice", q:"DELETE FROM users без WHERE?", opts:["Ошибка","Удалит первую","Удалит ВСЁ","Ничего"], answer:"Удалит ВСЁ", xp:10 },
            { id:"sc3-2", type:"write", q:"Удали user с id = 3", answer:"DELETE FROM users WHERE id = 3;", xp:15 },
            { id:"sc3-3", type:"choice", q:"TRUNCATE vs DELETE?", opts:["Одинаковы","TRUNCATE быстрее","DELETE быстрее","Нет разницы"], answer:"TRUNCATE быстрее", xp:10 }
        ]}
    ]},
    { id:"sql_joins", title:"JOIN", icon:"🔗", desc:"Объединение таблиц", req:["sql_crud"], lessons:[
        { id:"sj1", title:"INNER JOIN", exercises:[
            { id:"sj1-t1", type:"theory", q:"INNER JOIN", text:"INNER JOIN возвращает только строки с совпадениями в обеих таблицах.", code:"SELECT users.name, orders.product\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;" },
            { id:"sj1-1", type:"choice", q:"INNER JOIN возвращает?", opts:["Все строки","Только совпадения","Левые","Правые"], answer:"Только совпадения", xp:10 },
            { id:"sj1-2", type:"insert", q:"FROM users ___ JOIN orders ON users.id = orders.user_id", opts:["INNER","LEFT","RIGHT","FULL"], answer:"INNER", xp:10 },
            { id:"sj1-3", type:"write", q:"Объедини users и orders по user_id", answer:"SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;", xp:15 }
        ]},
        { id:"sj2", title:"LEFT и RIGHT JOIN", exercises:[
            { id:"sj2-t1", type:"theory", q:"LEFT/RIGHT JOIN", text:"LEFT JOIN — все из левой + совпадения из правой\nRIGHT JOIN — все из правой + совпадения из левой", code:"SELECT users.name, orders.product\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id;\n-- Покажет всех users, даже без заказов" },
            { id:"sj2-1", type:"choice", q:"LEFT JOIN без совпадения?", opts:["Ошибка","NULL","Пропускает","Пустая строка"], answer:"NULL", xp:10 },
            { id:"sj2-2", type:"choice", q:"LEFT JOIN показывает?", opts:["Только совпадения","Все из левой","Все из правой","Все из обеих"], answer:"Все из левой", xp:10 },
            { id:"sj2-3", type:"write", q:"Покажи всех users и их заказы (включая без заказов)", answer:"SELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id;", xp:15 }
        ]}
    ]},
    { id:"sql_aggregate", title:"Агрегатные", icon:"📈", desc:"COUNT, SUM, AVG", req:["sql_joins"], lessons:[
        { id:"sa1", title:"COUNT, SUM, AVG", exercises:[
            { id:"sa1-t1", type:"theory", q:"Агрегатные функции", text:"COUNT — количество строк\nSUM — сумма\nAVG — среднее\nMIN — минимум\nMAX — максимум", code:"SELECT COUNT(*) FROM users;\nSELECT AVG(age) FROM users;\nSELECT MAX(age) FROM users;\nSELECT SUM(price) FROM orders;" },
            { id:"sa1-1", type:"choice", q:"Как подсчитать количество?", opts:["LEN()","COUNT()","SIZE()","NUM()"], answer:"COUNT()", xp:10 },
            { id:"sa1-2", type:"choice", q:"AVG(age) возвращает?", opts:["Сумму","Среднее","Максимум","Количество"], answer:"Среднее", xp:10 },
            { id:"sa1-3", type:"write", q:"Посчитай количество users", answer:"SELECT COUNT(*) FROM users;", xp:15 },
            { id:"sa1-4", type:"write", q:"Найди максимальный возраст", answer:"SELECT MAX(age) FROM users;", xp:15 }
        ]},
        { id:"sa2", title:"GROUP BY и HAVING", exercises:[
            { id:"sa2-t1", type:"theory", q:"GROUP BY", text:"GROUP BY группирует строки по значению столбца.\nHAVING — фильтр для групп.", code:"SELECT city, COUNT(*) as count\nFROM users\nGROUP BY city\nHAVING COUNT(*) > 5\nORDER BY count DESC;" },
            { id:"sa2-1", type:"write", q:"Посчитай пользователей по городам", answer:"SELECT city, COUNT(*) FROM users GROUP BY city;", xp:15 },
            { id:"sa2-2", type:"choice", q:"HAVING vs WHERE?", opts:["Одинаковы","HAVING для групп","WHERE для групп","Нет разницы"], answer:"HAVING для групп", xp:10 },
            { id:"sa2-3", type:"write", q:"Города с более чем 10 пользователями", answer:"SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) > 10;", xp:20 }
        ]}
    ]},
    { id:"sql_advanced", title:"Продвинутый SQL", icon:"🚀", desc:"Подзапросы, VIEW", req:["sql_aggregate"], lessons:[
        { id:"sad1", title:"Подзапросы", exercises:[
            { id:"sad1-t1", type:"theory", q:"Подзапросы", text:"Подзапрос — запрос внутри запроса. Можно использовать в WHERE, FROM, SELECT.", code:"SELECT * FROM users\nWHERE age > (SELECT AVG(age) FROM users);\n\nSELECT * FROM users\nWHERE city IN (SELECT city FROM cities WHERE population > 1000000);" },
            { id:"sad1-1", type:"choice", q:"Подзапрос в WHERE возвращает?", opts:["Таблицу","Значение или список","Ошибку","Ничего"], answer:"Значение или список", xp:10 },
            { id:"sad1-2", type:"write", q:"Users старше среднего возраста", answer:"SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);", xp:20 }
        ]},
        { id:"sad2", title:"CREATE TABLE", exercises:[
            { id:"sad2-t1", type:"theory", q:"Создание таблиц", text:"CREATE TABLE создаёт новую таблицу с указанием столбцов и их типов.", code:"CREATE TABLE users (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    age INTEGER DEFAULT 0,\n    email TEXT UNIQUE,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);" },
            { id:"sad2-1", type:"choice", q:"PRIMARY KEY — это?", opts:["Любой столбец","Уникальный идентификатор","Индекс","Ограничение"], answer:"Уникальный идентификатор", xp:10 },
            { id:"sad2-2", type:"choice", q:"NOT NULL означает?", opts:["Может быть пустым","Не может быть пустым","Уникальный","По умолчанию"], answer:"Не может быть пустым", xp:10 },
            { id:"sad2-3", type:"write", q:"Создай таблицу products с id, name, price", answer:"CREATE TABLE products (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    price REAL\n);", xp:20 }
        ]},
        { id:"sad3", title:"Индексы и VIEW", exercises:[
            { id:"sad3-t1", type:"theory", q:"Индексы и представления", text:"INDEX — ускоряет поиск\nVIEW — сохранённый запрос", code:"CREATE INDEX idx_name ON users(name);\n\nCREATE VIEW active_users AS\nSELECT * FROM users WHERE active = 1;" },
            { id:"sad3-1", type:"choice", q:"INDEX ускоряет?", opts:["Вставку","Поиск","Удаление","Всё"], answer:"Поиск", xp:10 },
            { id:"sad3-2", type:"choice", q:"VIEW — это?", opts:["Копия таблицы","Сохранённый запрос","Индекс","Триггер"], answer:"Сохранённый запрос", xp:10 }
        ]}
    ]}
];

var JS_PRACTICE = [
    { id:"jspractice_basics", title:"JS Основы", icon:"🟨", desc:"Базовые задачи", alwaysOpen:true, color:"#F7DF1E", lessons:[
        { id:"jsp1", title:"Переменные и типы", exercises:[
            { id:"jsp1-1", type:"write", q:'Выведи "Hello, World!" в консоль', answer:'console.log("Hello, World!");', xp:15 },
            { id:"jsp1-2", type:"write", q:"Создай переменную age = 25 и выведи", answer:"let age = 25;\nconsole.log(age);", xp:15 },
            { id:"jsp1-3", type:"write", q:"Создай константу PI = 3.14", answer:"const PI = 3.14;", xp:15 }
        ]}
    ]},
    { id:"jspractice_func", title:"JS Функции", icon:"⚡", desc:"Arrow и обычные", alwaysOpen:true, color:"#F7DF1E", lessons:[
        { id:"jsp2", title:"Функции", exercises:[
            { id:"jsp2-1", type:"write", q:"Функция double(x) возвращает x*2", answer:"const double = x => x * 2;", xp:20 },
            { id:"jsp2-2", type:"write", q:"Функция sum(a, b) возвращает сумму", answer:"function sum(a, b) { return a + b; }", xp:20 },
            { id:"jsp2-3", type:"write", q:"Функция isEven(n) — true если чётное", answer:"const isEven = n => n % 2 === 0;", xp:20 }
        ]}
    ]},
    { id:"jspractice_arrays", title:"JS Массивы", icon:"📋", desc:"map, filter, reduce", alwaysOpen:true, color:"#F7DF1E", lessons:[
        { id:"jsp3", title:"Массивы", exercises:[
            { id:"jsp3-1", type:"write", q:"Создай массив [1,2,3] и выведи сумму", answer:"const arr = [1,2,3];\nconsole.log(arr.reduce((a,b)=>a+b));", xp:20 },
            { id:"jsp3-2", type:"write", q:"Отфильтруй чётные из [1,2,3,4,5]", answer:"[1,2,3,4,5].filter(x => x % 2 === 0);", xp:20 },
            { id:"jsp3-3", type:"write", q:"Удвой каждый элемент [1,2,3]", answer:"[1,2,3].map(x => x * 2);", xp:20 }
        ]}
    ]}
];

var HTML_PRACTICE = [
    { id:"htmlpractice", title:"HTML/CSS Практика", icon:"🌐", desc:"Разметка", alwaysOpen:true, color:"#E34F26", lessons:[
        { id:"hp1", title:"HTML теги", exercises:[
            { id:"hp1-1", type:"write", q:"Создай заголовок h1 с текстом Hello", answer:"<h1>Hello</h1>", xp:15 },
            { id:"hp1-2", type:"write", q:"Создай ссылку на google.com", answer:'<a href="https://google.com">Google</a>', xp:15 },
            { id:"hp1-3", type:"write", q:"Создай картинку с alt текстом", answer:'<img src="photo.jpg" alt="Фото">', xp:15 }
        ]}
    ]},
    { id:"csspractice", title:"CSS Практика", icon:"🎨", desc:"Стили", alwaysOpen:true, color:"#264DE4", lessons:[
        { id:"cp1", title:"CSS свойства", exercises:[
            { id:"cp1-1", type:"write", q:"Сделай текст красным", answer:"color: red;", xp:15 },
            { id:"cp1-2", type:"write", q:"Центрируй flex контейнер", answer:"display: flex;\njustify-content: center;\nalign-items: center;", xp:20 },
            { id:"cp1-3", type:"write", q:"Создай сетку из 3 колонок", answer:"display: grid;\ngrid-template-columns: 1fr 1fr 1fr;", xp:20 }
        ]}
    ]}
];

var SQL_PRACTICE = [
    { id:"sqlpractice", title:"SQL Практика", icon:"🗄️", desc:"Запросы", alwaysOpen:true, color:"#4479A1", lessons:[
        { id:"sp1", title:"Запросы", exercises:[
            { id:"sp1-1", type:"write", q:"Выбери все данные из users", answer:"SELECT * FROM users;", xp:15 },
            { id:"sp1-2", type:"write", q:"Найди users старше 25", answer:"SELECT * FROM users WHERE age > 25;", xp:15 },
            { id:"sp1-3", type:"write", q:"Посчитай количество users", answer:"SELECT COUNT(*) FROM users;", xp:15 },
            { id:"sp1-4", type:"write", q:"Отсортируй users по возрасту", answer:"SELECT * FROM users ORDER BY age;", xp:15 },
            { id:"sp1-5", type:"write", q:"Добавь нового user Bob, 30", answer:"INSERT INTO users (name, age) VALUES ('Bob', 30);", xp:20 }
        ]}
    ]}
];

var GO_SKILLS = [
    { id:"go_basics", title:"Основы Go", icon:"📦", desc:"package, fmt, типы", req:[], lessons:[
        { id:"gob1", title:"Привет, Go!", exercises:[
            { id:"gob1-t1", type:"theory", q:"Что такое Go?", text:"Go (Golang) — язык программирования от Google. Быстрый, простой, отлично подходит для серверов и микросервисов." },
            { id:"gob1-t2", type:"theory", q:"Структура программы", text:"Каждая Go программа начинается с package main и функции main().", code:'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}' },
            { id:"gob1-1", type:"choice", q:"Как вывести текст в Go?", opts:["print()","console.log()","fmt.Println()","echo()"], answer:"fmt.Println()", xp:10 },
            { id:"gob1-2", type:"insert", q:'fmt.___(\"Hello\")', opts:["Println","Print","Log","Out"], answer:"Println", xp:10 },
            { id:"gob1-3", type:"write", q:'Выведи "Hello, Go!"', answer:'fmt.Println("Hello, Go!")', xp:15 },
            { id:"gob1-4", type:"choice", q:"Главная функция в Go?", opts:["start()","main()","init()","run()"], answer:"main()", xp:10 },
            { id:"gob1-5", type:"choice", q:"Пакет для вывода?", opts:["io","os","fmt","log"], answer:"fmt", xp:10 }
        ]},
        { id:"gob2", title:"Импорты", exercises:[
            { id:"gob2-t1", type:"theory", q:"import", text:"import подключает пакеты. Можно импортировать несколько пакетов.", code:'import "fmt"\n\nimport (\n    "fmt"\n    "math"\n    "strings"\n)' },
            { id:"gob2-1", type:"choice", q:"Как импортировать fmt?", opts:['require "fmt"','import "fmt"','include "fmt"','use "fmt"'], answer:'import "fmt"', xp:10 },
            { id:"gob2-2", type:"choice", q:"Импорт нескольких пакетов?", opts:["import ()","imports {}","require []","include <>"], answer:"import ()", xp:10 }
        ]}
    ]},
    { id:"go_vars", title:"Переменные Go", icon:"📦", desc:"var, :=, const", req:["go_basics"], lessons:[
        { id:"gov1", title:"Объявление переменных", exercises:[
            { id:"gov1-t1", type:"theory", q:"var и :=", text:"var — явное объявление с типом.\n:= — короткое объявление с выводом типа.", code:'var name string = "Alice"\nvar age int = 25\n\n// Короткая форма\nname := "Bob"\nage := 30\npi := 3.14' },
            { id:"gov1-1", type:"choice", q:"Короткое объявление?", opts:["var x = 5","let x = 5","x := 5","x = 5"], answer:"x := 5", xp:10 },
            { id:"gov1-2", type:"write", q:"Создай переменную age = 25 коротким способом", answer:"age := 25", xp:15 },
            { id:"gov1-3", type:"choice", q:":= можно использовать?", opts:["Везде","Только в функциях","Только глобально","Нигде"], answer:"Только в функциях", xp:10 },
            { id:"gov1-4", type:"write", q:'Создай name = "Alice" через var', answer:'var name string = "Alice"', xp:15 },
            { id:"gov1-5", type:"insert", q:"___ count int = 10", opts:["var","let","const","int"], answer:"var", xp:10 }
        ]},
        { id:"gov2", title:"Константы", exercises:[
            { id:"gov2-t1", type:"theory", q:"const", text:"const объявляет неизменяемые значения.", code:'const PI = 3.14159\nconst MaxSize = 100\nconst Greeting = "Hello"' },
            { id:"gov2-1", type:"choice", q:"Как объявить константу?", opts:["final PI","const PI","let PI","var PI"], answer:"const PI", xp:10 },
            { id:"gov2-2", type:"write", q:"Создай константу MaxValue = 1000", answer:"const MaxValue = 1000", xp:15 }
        ]},
        { id:"gov3", title:"Типы данных", exercises:[
            { id:"gov3-t1", type:"theory", q:"Типы в Go", text:"int, int8, int16, int32, int64 — целые\nfloat32, float64 — дробные\nstring — строки\nbool — true/false", code:'var age int = 25\nvar price float64 = 19.99\nvar name string = "Go"\nvar active bool = true' },
            { id:"gov3-1", type:"choice", q:"Тип для дробных чисел?", opts:["double","decimal","float64","number"], answer:"float64", xp:10 },
            { id:"gov3-2", type:"choice", q:"Тип для true/false?", opts:["boolean","bool","bit","logic"], answer:"bool", xp:10 },
            { id:"gov3-3", type:"choice", q:"Строка в Go?", opts:["str","String","string","text"], answer:"string", xp:10 }
        ]}
    ]},
    { id:"go_cond", title:"Условия Go", icon:"🔀", desc:"if, switch", req:["go_vars"], lessons:[
        { id:"goc1", title:"if-else", exercises:[
            { id:"goc1-t1", type:"theory", q:"Условия в Go", text:"if без скобок вокруг условия, но с обязательными фигурными скобками.", code:'if age >= 18 {\n    fmt.Println("Adult")\n} else {\n    fmt.Println("Child")\n}\n\n// if с инициализацией\nif x := 10; x > 5 {\n    fmt.Println("Big")\n}' },
            { id:"goc1-1", type:"choice", q:"Скобки вокруг условия в Go?", opts:["Обязательны","Не нужны","Опционально","С точкой"], answer:"Не нужны", xp:10 },
            { id:"goc1-2", type:"write", q:'Если x > 10, выведи "Big"', answer:'if x > 10 {\n    fmt.Println("Big")\n}', xp:15 },
            { id:"goc1-3", type:"choice", q:"if x := 5; x > 0 — что такое x := 5?", opts:["Ошибка","Инициализация","Присваивание","Сравнение"], answer:"Инициализация", xp:10 }
        ]},
        { id:"goc2", title:"switch", exercises:[
            { id:"goc2-t1", type:"theory", q:"switch в Go", text:"switch без break — Go автоматически выходит. fallthrough для продолжения.", code:'switch day {\ncase "Mon":\n    fmt.Println("Monday")\ncase "Tue":\n    fmt.Println("Tuesday")\ndefault:\n    fmt.Println("Other")\n}' },
            { id:"goc2-1", type:"choice", q:"Нужен break в switch Go?", opts:["Да, всегда","Нет, автоматически","Иногда","Только в default"], answer:"Нет, автоматически", xp:10 },
            { id:"goc2-2", type:"choice", q:"fallthrough делает?", opts:["Выходит","Продолжает следующий case","Ошибка","Пропускает"], answer:"Продолжает следующий case", xp:10 }
        ]}
    ]},
    { id:"go_loops", title:"Циклы Go", icon:"🔄", desc:"for, range", req:["go_cond"], lessons:[
        { id:"gol1", title:"Цикл for", exercises:[
            { id:"gol1-t1", type:"theory", q:"for — единственный цикл", text:"В Go только один цикл — for. Он заменяет while и for.", code:'// Обычный for\nfor i := 0; i < 5; i++ {\n    fmt.Println(i)\n}\n\n// Как while\nfor x < 10 {\n    x++\n}\n\n// Бесконечный\nfor {\n    // ...\n    break\n}' },
            { id:"gol1-1", type:"choice", q:"Какие циклы есть в Go?", opts:["for, while, do","только for","for, foreach","for, loop"], answer:"только for", xp:10 },
            { id:"gol1-2", type:"write", q:"Выведи числа от 0 до 4", answer:'for i := 0; i < 5; i++ {\n    fmt.Println(i)\n}', xp:15 },
            { id:"gol1-3", type:"choice", q:"for без условия — это?", opts:["Ошибка","Бесконечный цикл","Один раз","Не выполнится"], answer:"Бесконечный цикл", xp:10 }
        ]},
        { id:"gol2", title:"range", exercises:[
            { id:"gol2-t1", type:"theory", q:"range", text:"range перебирает массивы, слайсы, мапы, строки.", code:'nums := []int{1, 2, 3}\nfor i, v := range nums {\n    fmt.Printf("%d: %d\\n", i, v)\n}\n\n// Только значения\nfor _, v := range nums {\n    fmt.Println(v)\n}' },
            { id:"gol2-1", type:"choice", q:"range возвращает?", opts:["Только значения","Индекс и значение","Только индекс","Длину"], answer:"Индекс и значение", xp:10 },
            { id:"gol2-2", type:"choice", q:"_ в for _, v := range?", opts:["Ошибка","Игнорирует индекс","Игнорирует значение","Пустой элемент"], answer:"Игнорирует индекс", xp:10 },
            { id:"gol2-3", type:"write", q:"Переберри слайс nums и выведи значения", answer:'for _, v := range nums {\n    fmt.Println(v)\n}', xp:15 }
        ]}
    ]},
    { id:"go_func", title:"Функции Go", icon:"⚡", desc:"func, return", req:["go_loops"], lessons:[
        { id:"gof1", title:"Функции", exercises:[
            { id:"gof1-t1", type:"theory", q:"func", text:"func объявляет функцию. Тип возврата указывается после параметров.", code:'func greet(name string) string {\n    return "Hello, " + name\n}\n\nfunc add(a, b int) int {\n    return a + b\n}\n\n// Множественный возврат\nfunc divide(a, b int) (int, error) {\n    if b == 0 {\n        return 0, errors.New("division by zero")\n    }\n    return a / b, nil\n}' },
            { id:"gof1-1", type:"choice", q:"Где указывается тип возврата?", opts:["Перед именем","После параметров","В теле","Нигде"], answer:"После параметров", xp:10 },
            { id:"gof1-2", type:"write", q:"Функция double(x int) возвращает x * 2", answer:'func double(x int) int {\n    return x * 2\n}', xp:15 },
            { id:"gof1-3", type:"choice", q:"Go поддерживает множественный возврат?", opts:["Да","Нет","Только 2","С ограничениями"], answer:"Да", xp:10 }
        ]},
        { id:"gof2", title:"Множественный возврат", exercises:[
            { id:"gof2-t1", type:"theory", q:"Несколько значений", text:"Функции Go могут возвращать несколько значений. Часто используется для возврата ошибки.", code:'func getUser(id int) (string, int, error) {\n    return "Alice", 25, nil\n}\n\nname, age, err := getUser(1)\nif err != nil {\n    log.Fatal(err)\n}' },
            { id:"gof2-1", type:"write", q:"Функция minMax(a, b int) возвращает min и max", answer:'func minMax(a, b int) (int, int) {\n    if a < b {\n        return a, b\n    }\n    return b, a\n}', xp:20 }
        ]}
    ]},
    { id:"go_slices", title:"Слайсы Go", icon:"📋", desc:"slice, append, make", req:["go_func"], lessons:[
        { id:"gos1", title:"Слайсы", exercises:[
            { id:"gos1-t1", type:"theory", q:"Слайсы", text:"Слайс — динамический массив. Создаётся через литерал [] или make().", code:'nums := []int{1, 2, 3}\nnums = append(nums, 4, 5)\n\n// Через make\ndata := make([]int, 5)      // len=5, cap=5\ndata := make([]int, 0, 10)  // len=0, cap=10' },
            { id:"gos1-1", type:"choice", q:"Как добавить в слайс?", opts:["push()","add()","append()","insert()"], answer:"append()", xp:10 },
            { id:"gos1-2", type:"write", q:"Создай слайс [1, 2, 3]", answer:"nums := []int{1, 2, 3}", xp:15 },
            { id:"gos1-3", type:"write", q:"Добавь 4 в слайс nums", answer:"nums = append(nums, 4)", xp:15 },
            { id:"gos1-4", type:"choice", q:"make([]int, 5) — что такое 5?", opts:["Ёмкость","Длина","Индекс","Значение"], answer:"Длина", xp:10 }
        ]},
        { id:"gos2", title:"Срезы слайсов", exercises:[
            { id:"gos2-t1", type:"theory", q:"Срезы", text:"Слайс можно срезать через [start:end].", code:'nums := []int{1, 2, 3, 4, 5}\nfmt.Println(nums[1:3])  // [2, 3]\nfmt.Println(nums[:3])   // [1, 2, 3]\nfmt.Println(nums[2:])   // [3, 4, 5]' },
            { id:"gos2-1", type:"choice", q:"nums[1:3] вернёт?", opts:["[1,2,3]","[2,3]","[2,3,4]","[1,2]"], answer:"[2,3]", xp:10 },
            { id:"gos2-2", type:"choice", q:"nums[:2] вернёт?", opts:["[1,2]","[3,4,5]","[2]","[1,2,3]"], answer:"[1,2]", xp:10 }
        ]}
    ]},
    { id:"go_maps", title:"Мапы Go", icon:"🗺️", desc:"map, make", req:["go_slices"], lessons:[
        { id:"gom1", title:"Мапы", exercises:[
            { id:"gom1-t1", type:"theory", q:"map", text:"map — ассоциативный массив (словарь). Ключ-значение.", code:'ages := map[string]int{\n    "Alice": 25,\n    "Bob":   30,\n}\n\n// Через make\nages := make(map[string]int)\nages["Alice"] = 25\n\n// Проверка существования\nage, ok := ages["Alice"]\nif ok {\n    fmt.Println(age)\n}' },
            { id:"gom1-1", type:"choice", q:"Тип map[string]int — это?", opts:["Массив строк","Срез","Мапа string->int","Структура"], answer:"Мапа string->int", xp:10 },
            { id:"gom1-2", type:"write", q:"Создай пустую map[string]int", answer:"m := make(map[string]int)", xp:15 },
            { id:"gom1-3", type:"choice", q:'ages["Bob"] если Bob нет?', opts:["Ошибка","nil","0","undefined"], answer:"0", xp:10 }
        ]},
        { id:"gom2", title:"Операции с map", exercises:[
            { id:"gom2-t1", type:"theory", q:"Удаление и проверка", text:"delete() удаляет ключ. ok проверяет существование.", code:'delete(ages, "Alice")  // удалить\n\n// Проверка существования\nif age, ok := ages["Bob"]; ok {\n    fmt.Printf("Bob is %d\\n", age)\n}' },
            { id:"gom2-1", type:"choice", q:"Как удалить из map?", opts:["remove()","del()","delete()","drop()"], answer:"delete()", xp:10 },
            { id:"gom2-2", type:"write", q:'Удали ключ "Alice" из ages', answer:'delete(ages, "Alice")', xp:15 }
        ]}
    ]},
    { id:"go_structs", title:"Структуры Go", icon:"🏗️", desc:"struct, методы", req:["go_maps"], lessons:[
        { id:"gost1", title:"Структуры", exercises:[
            { id:"gost1-t1", type:"theory", q:"struct", text:"struct группирует данные. Как класс, но без наследования.", code:'type Person struct {\n    Name string\n    Age  int\n}\n\n// Создание\np := Person{Name: "Alice", Age: 25}\np := Person{"Bob", 30}\n\nfmt.Println(p.Name)' },
            { id:"gost1-1", type:"choice", q:"Как объявить структуру?", opts:["class Person","struct Person","type Person struct","def Person"], answer:"type Person struct", xp:10 },
            { id:"gost1-2", type:"write", q:"Создай структуру User с Name и Email", answer:'type User struct {\n    Name  string\n    Email string\n}', xp:15 }
        ]},
        { id:"gost2", title:"Методы", exercises:[
            { id:"gost2-t1", type:"theory", q:"Методы структур", text:"Метод — функция с receiver (получателем).", code:'type Rectangle struct {\n    Width, Height int\n}\n\nfunc (r Rectangle) Area() int {\n    return r.Width * r.Height\n}\n\nfunc (r *Rectangle) Scale(factor int) {\n    r.Width *= factor\n    r.Height *= factor\n}\n\nrect := Rectangle{10, 5}\nfmt.Println(rect.Area())  // 50' },
            { id:"gost2-1", type:"choice", q:"(r Rectangle) Area() — что такое r?", opts:["Параметр","Возврат","Receiver","Тип"], answer:"Receiver", xp:10 },
            { id:"gost2-2", type:"choice", q:"*Rectangle — зачем указатель?", opts:["Быстрее","Можно изменять","Обязательно","Для больших структур"], answer:"Можно изменять", xp:10 }
        ]}
    ]},
    { id:"go_interfaces", title:"Интерфейсы Go", icon:"🔌", desc:"interface", req:["go_structs"], lessons:[
        { id:"goi1", title:"Интерфейсы", exercises:[
            { id:"goi1-t1", type:"theory", q:"interface", text:"Интерфейс определяет набор методов. Реализуется неявно.", code:'type Speaker interface {\n    Speak() string\n}\n\ntype Dog struct{}\nfunc (d Dog) Speak() string { return "Woof!" }\n\ntype Cat struct{}\nfunc (c Cat) Speak() string { return "Meow!" }\n\nfunc MakeSound(s Speaker) {\n    fmt.Println(s.Speak())\n}' },
            { id:"goi1-1", type:"choice", q:"Интерфейс в Go реализуется?", opts:["Явно (implements)","Неявно","Через extends","Декоратором"], answer:"Неявно", xp:10 },
            { id:"goi1-2", type:"choice", q:"interface{} — что это?", opts:["Ошибка","Пустой интерфейс","Generics","Тип any"], answer:"Пустой интерфейс", xp:10 }
        ]}
    ]},
    { id:"go_goroutines", title:"Горутины", icon:"⚡", desc:"go, channel", req:["go_interfaces"], lessons:[
        { id:"gogor1", title:"Горутины", exercises:[
            { id:"gogor1-t1", type:"theory", q:"Горутины", text:"Горутина — легковесный поток. Запускается через go.", code:'func sayHello() {\n    fmt.Println("Hello")\n}\n\ngo sayHello()  // запуск горутины\n\n// Анонимная горутина\ngo func() {\n    fmt.Println("Async!")\n}()' },
            { id:"gogor1-1", type:"choice", q:"Как запустить горутину?", opts:["async func()","go func()","thread func()","spawn func()"], answer:"go func()", xp:10 },
            { id:"gogor1-2", type:"choice", q:"Горутина — это?", opts:["Процесс","Поток ОС","Легковесный поток","Функция"], answer:"Легковесный поток", xp:10 }
        ]},
        { id:"gogor2", title:"Каналы", exercises:[
            { id:"gogor2-t1", type:"theory", q:"Каналы", text:"Каналы — способ коммуникации между горутинами.", code:'ch := make(chan int)\n\ngo func() {\n    ch <- 42  // отправить\n}()\n\nvalue := <-ch  // получить\nfmt.Println(value)' },
            { id:"gogor2-1", type:"choice", q:"make(chan int) создаёт?", opts:["Слайс","Мапу","Канал","Структуру"], answer:"Канал", xp:10 },
            { id:"gogor2-2", type:"choice", q:"ch <- 42 делает?", opts:["Получает","Отправляет","Сравнивает","Создаёт"], answer:"Отправляет", xp:10 },
            { id:"gogor2-3", type:"write", q:"Создай канал для строк", answer:"ch := make(chan string)", xp:15 }
        ]}
    ]}
];

var RUST_SKILLS = [
    { id:"rust_basics", title:"Основы Rust", icon:"📦", desc:"cargo, println!", req:[], lessons:[
        { id:"rb1", title:"Привет, Rust!", exercises:[
            { id:"rb1-t1", type:"theory", q:"Что такое Rust?", text:"Rust — системный язык программирования. Безопасность памяти без сборщика мусора. Быстрый как C/C++." },
            { id:"rb1-t2", type:"theory", q:"Первая программа", text:"println! — макрос для вывода. ! означает макрос.", code:'fn main() {\n    println!("Hello, Rust!");\n}' },
            { id:"rb1-1", type:"choice", q:"Как вывести текст в Rust?", opts:["print()","console.log()","println!()","echo()"], answer:"println!()", xp:10 },
            { id:"rb1-2", type:"insert", q:'println___("Hello");', opts:["!","()","::","->"], answer:"!", xp:10 },
            { id:"rb1-3", type:"write", q:'Выведи "Hello, Rust!"', answer:'println!("Hello, Rust!");', xp:15 },
            { id:"rb1-4", type:"choice", q:"! в println! означает?", opts:["Ошибка","Макрос","NOT","Важно"], answer:"Макрос", xp:10 },
            { id:"rb1-5", type:"choice", q:"Главная функция в Rust?", opts:["start()","main()","run()","init()"], answer:"main()", xp:10 }
        ]},
        { id:"rb2", title:"Cargo", exercises:[
            { id:"rb2-t1", type:"theory", q:"Cargo", text:"Cargo — менеджер пакетов и сборщик Rust.\ncargo new — создать проект\ncargo build — собрать\ncargo run — запустить", code:'# Создать проект\ncargo new my_project\n\n# Собрать и запустить\ncargo run\n\n# Только собрать\ncargo build --release' },
            { id:"rb2-1", type:"choice", q:"Как создать проект?", opts:["rust new","cargo new","rustc new","make new"], answer:"cargo new", xp:10 },
            { id:"rb2-2", type:"choice", q:"cargo run делает?", opts:["Только собирает","Собирает и запускает","Только запускает","Тестирует"], answer:"Собирает и запускает", xp:10 }
        ]}
    ]},
    { id:"rust_vars", title:"Переменные Rust", icon:"📦", desc:"let, mut, const", req:["rust_basics"], lessons:[
        { id:"rv1", title:"let и mut", exercises:[
            { id:"rv1-t1", type:"theory", q:"Переменные в Rust", text:"let — неизменяемая переменная.\nlet mut — изменяемая.\nПо умолчанию всё неизменяемо!", code:'let x = 5;         // неизменяемая\nlet mut y = 10;    // изменяемая\ny = 20;            // OK\n// x = 6;          // Ошибка!' },
            { id:"rv1-1", type:"choice", q:"По умолчанию переменные?", opts:["Изменяемые","Неизменяемые","Глобальные","Статические"], answer:"Неизменяемые", xp:10 },
            { id:"rv1-2", type:"insert", q:"let ___ count = 0;", opts:["mut","var","const","mutable"], answer:"mut", xp:10 },
            { id:"rv1-3", type:"write", q:"Создай изменяемую переменную x = 5", answer:"let mut x = 5;", xp:15 },
            { id:"rv1-4", type:"choice", q:"let x = 5; x = 10; — что будет?", opts:["Работает","Ошибка компиляции","Предупреждение","x = 10"], answer:"Ошибка компиляции", xp:10 }
        ]},
        { id:"rv2", title:"Shadowing и типы", exercises:[
            { id:"rv2-t1", type:"theory", q:"Shadowing", text:"Можно объявить переменную с тем же именем — shadowing. Это НЕ изменение, а новая переменная.", code:'let x = 5;\nlet x = x + 1;  // shadowing\nlet x = x * 2;  // ещё раз\nprintln!("{}", x);  // 12' },
            { id:"rv2-1", type:"choice", q:"Shadowing — это?", opts:["Ошибка","Новая переменная","Изменение","Копирование"], answer:"Новая переменная", xp:10 },
            { id:"rv2-2", type:"choice", q:'let x = "hello"; let x = x.len(); — можно?', opts:["Да","Нет","Только с mut","С предупреждением"], answer:"Да", xp:10 }
        ]},
        { id:"rv3", title:"Типы данных", exercises:[
            { id:"rv3-t1", type:"theory", q:"Типы в Rust", text:"i8, i16, i32, i64, i128 — знаковые целые\nu8, u16, u32, u64, u128 — беззнаковые\nf32, f64 — дробные\nbool — true/false\nchar — символ", code:'let x: i32 = 42;\nlet y: f64 = 3.14;\nlet active: bool = true;\nlet letter: char = \'A\';' },
            { id:"rv3-1", type:"choice", q:"i32 — это?", opts:["Беззнаковое 32-бит","Знаковое 32-бит","Дробное","Строка"], answer:"Знаковое 32-бит", xp:10 },
            { id:"rv3-2", type:"choice", q:"u8 может хранить?", opts:["От -128 до 127","От 0 до 255","От 0 до 127","Любое число"], answer:"От 0 до 255", xp:10 }
        ]}
    ]},
    { id:"rust_cond", title:"Условия Rust", icon:"🔀", desc:"if, match", req:["rust_vars"], lessons:[
        { id:"rc1", title:"if-else", exercises:[
            { id:"rc1-t1", type:"theory", q:"Условия в Rust", text:"if без скобок. Условие должно быть bool. if — выражение (возвращает значение).", code:'let x = 5;\nif x > 0 {\n    println!("Positive");\n} else if x < 0 {\n    println!("Negative");\n} else {\n    println!("Zero");\n}\n\n// if как выражение\nlet sign = if x > 0 { "pos" } else { "neg" };' },
            { id:"rc1-1", type:"choice", q:"if в Rust — это?", opts:["Оператор","Выражение","Функция","Макрос"], answer:"Выражение", xp:10 },
            { id:"rc1-2", type:"write", q:'Если x > 10, выведи "Big"', answer:'if x > 10 {\n    println!("Big");\n}', xp:15 },
            { id:"rc1-3", type:"choice", q:'let y = if x > 0 { 1 } else { 0 }; — можно?', opts:["Да","Нет","Синтаксическая ошибка","Только в функции"], answer:"Да", xp:10 }
        ]},
        { id:"rc2", title:"match", exercises:[
            { id:"rc2-t1", type:"theory", q:"Pattern matching", text:"match — мощный pattern matching. Должен покрывать все случаи.", code:'let x = 5;\nmatch x {\n    1 => println!("one"),\n    2 | 3 => println!("two or three"),\n    4..=10 => println!("4 to 10"),\n    _ => println!("other"),\n}' },
            { id:"rc2-1", type:"choice", q:"_ в match означает?", opts:["Ошибка","Всё остальное","Пустое значение","Тип any"], answer:"Всё остальное", xp:10 },
            { id:"rc2-2", type:"choice", q:"match должен покрывать?", opts:["Основные случаи","Все случаи","Минимум 2","Только _"], answer:"Все случаи", xp:10 },
            { id:"rc2-3", type:"choice", q:"4..=10 означает?", opts:["4 до 9","4 до 10 включительно","4 и 10","4 или 10"], answer:"4 до 10 включительно", xp:10 }
        ]}
    ]},
    { id:"rust_loops", title:"Циклы Rust", icon:"🔄", desc:"loop, while, for", req:["rust_cond"], lessons:[
        { id:"rl1", title:"loop и while", exercises:[
            { id:"rl1-t1", type:"theory", q:"loop", text:"loop — бесконечный цикл. Выход через break. Можно вернуть значение.", code:'let mut count = 0;\nloop {\n    count += 1;\n    if count == 5 {\n        break;\n    }\n}\n\n// Возврат значения\nlet result = loop {\n    count += 1;\n    if count == 10 {\n        break count * 2;\n    }\n};' },
            { id:"rl1-1", type:"choice", q:"loop — это?", opts:["Цикл for","Бесконечный цикл","Условный цикл","Итератор"], answer:"Бесконечный цикл", xp:10 },
            { id:"rl1-2", type:"choice", q:"break count * 2 — что делает?", opts:["Ошибка","Выходит и возвращает count*2","Умножает и продолжает","Только умножает"], answer:"Выходит и возвращает count*2", xp:10 }
        ]},
        { id:"rl2", title:"for и итераторы", exercises:[
            { id:"rl2-t1", type:"theory", q:"for", text:"for перебирает итераторы. range создаётся через ..", code:'for i in 0..5 {\n    println!("{}", i);  // 0, 1, 2, 3, 4\n}\n\nfor i in 0..=5 {\n    println!("{}", i);  // 0, 1, 2, 3, 4, 5\n}\n\nlet arr = [10, 20, 30];\nfor x in arr.iter() {\n    println!("{}", x);\n}' },
            { id:"rl2-1", type:"choice", q:"0..5 даёт?", opts:["0,1,2,3,4,5","0,1,2,3,4","1,2,3,4,5","5 нулей"], answer:"0,1,2,3,4", xp:10 },
            { id:"rl2-2", type:"choice", q:"0..=5 даёт?", opts:["0,1,2,3,4","0,1,2,3,4,5","1,2,3,4,5","5 нулей"], answer:"0,1,2,3,4,5", xp:10 },
            { id:"rl2-3", type:"write", q:"Выведи числа от 1 до 10", answer:'for i in 1..=10 {\n    println!("{}", i);\n}', xp:15 }
        ]}
    ]},
    { id:"rust_func", title:"Функции Rust", icon:"⚡", desc:"fn, return", req:["rust_loops"], lessons:[
        { id:"rf1", title:"Функции", exercises:[
            { id:"rf1-t1", type:"theory", q:"fn", text:"fn объявляет функцию. Тип возврата после ->. Последнее выражение без ; — return.", code:'fn add(a: i32, b: i32) -> i32 {\n    a + b  // без ; = return\n}\n\nfn greet(name: &str) {\n    println!("Hello, {}!", name);\n}\n\nfn main() {\n    let sum = add(5, 3);\n    greet("Rust");\n}' },
            { id:"rf1-1", type:"choice", q:"Тип возврата указывается?", opts:["Перед именем","После ->","В скобках","Автоматически"], answer:"После ->", xp:10 },
            { id:"rf1-2", type:"choice", q:"a + b без ; — это?", opts:["Ошибка","return a + b","Просто сложение","Statement"], answer:"return a + b", xp:10 },
            { id:"rf1-3", type:"write", q:"Функция double(x: i32) возвращает x * 2", answer:'fn double(x: i32) -> i32 {\n    x * 2\n}', xp:15 }
        ]}
    ]},
    { id:"rust_ownership", title:"Владение Rust", icon:"🔐", desc:"ownership, borrow", req:["rust_func"], lessons:[
        { id:"ro1", title:"Ownership", exercises:[
            { id:"ro1-t1", type:"theory", q:"Владение", text:"Главная фича Rust! Каждое значение имеет владельца. Один владелец в один момент. При выходе из scope значение удаляется.", code:'let s1 = String::from("hello");\nlet s2 = s1;  // s1 перемещено в s2\n// println!("{}", s1);  // Ошибка! s1 больше не валидна\nprintln!("{}", s2);  // OK' },
            { id:"ro1-1", type:"choice", q:"После let s2 = s1; что с s1?", opts:["Копируется","Перемещается","Удаляется","Остаётся"], answer:"Перемещается", xp:10 },
            { id:"ro1-2", type:"choice", q:"Move (перемещение) касается?", opts:["Всех типов","Только String","Только heap","Только stack"], answer:"Только heap", xp:10 }
        ]},
        { id:"ro2", title:"Borrowing", exercises:[
            { id:"ro2-t1", type:"theory", q:"Заимствование", text:"& — неизменяемая ссылка (borrow).\n&mut — изменяемая ссылка.\nМожно много & или одна &mut.", code:'let s = String::from("hello");\n\n// Неизменяемое заимствование\nlet len = calculate_length(&s);\nprintln!("{} len = {}", s, len);\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}\n\n// Изменяемое\nfn add_world(s: &mut String) {\n    s.push_str(", world");\n}' },
            { id:"ro2-1", type:"choice", q:"& создаёт?", opts:["Копию","Ссылку","Перемещение","Клон"], answer:"Ссылку", xp:10 },
            { id:"ro2-2", type:"choice", q:"&mut позволяет?", opts:["Только читать","Читать и менять","Только менять","Удалять"], answer:"Читать и менять", xp:10 },
            { id:"ro2-3", type:"choice", q:"Можно ли 2 &mut одновременно?", opts:["Да","Нет","Иногда","В разных потоках"], answer:"Нет", xp:10 }
        ]}
    ]},
    { id:"rust_structs", title:"Структуры Rust", icon:"🏗️", desc:"struct, impl", req:["rust_ownership"], lessons:[
        { id:"rs1", title:"struct", exercises:[
            { id:"rs1-t1", type:"theory", q:"Структуры", text:"struct группирует данные. impl добавляет методы.", code:'struct User {\n    name: String,\n    age: u32,\n    active: bool,\n}\n\nlet user = User {\n    name: String::from("Alice"),\n    age: 25,\n    active: true,\n};' },
            { id:"rs1-1", type:"choice", q:"Как объявить структуру?", opts:["class User","type User","struct User","def User"], answer:"struct User", xp:10 },
            { id:"rs1-2", type:"write", q:"Структура Point с x и y типа i32", answer:'struct Point {\n    x: i32,\n    y: i32,\n}', xp:15 }
        ]},
        { id:"rs2", title:"impl", exercises:[
            { id:"rs2-t1", type:"theory", q:"Методы", text:"impl добавляет методы к структуре. self — текущий экземпляр.", code:'struct Rectangle {\n    width: u32,\n    height: u32,\n}\n\nimpl Rectangle {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n\n    fn new(w: u32, h: u32) -> Rectangle {\n        Rectangle { width: w, height: h }\n    }\n}\n\nlet rect = Rectangle::new(10, 5);\nprintln!("Area: {}", rect.area());' },
            { id:"rs2-1", type:"choice", q:"Методы добавляются через?", opts:["def","fn","impl","method"], answer:"impl", xp:10 },
            { id:"rs2-2", type:"choice", q:"&self означает?", opts:["Копия","Заимствование self","Перемещение","Мутация"], answer:"Заимствование self", xp:10 }
        ]}
    ]},
    { id:"rust_enums", title:"Enum Rust", icon:"📋", desc:"enum, Option, Result", req:["rust_structs"], lessons:[
        { id:"re1", title:"enum", exercises:[
            { id:"re1-t1", type:"theory", q:"Перечисления", text:"enum может содержать данные! Option и Result — встроенные enum.", code:'enum Message {\n    Quit,\n    Move { x: i32, y: i32 },\n    Write(String),\n}\n\nlet m = Message::Write(String::from("hello"));\n\nmatch m {\n    Message::Quit => println!("Quit"),\n    Message::Move { x, y } => println!("Move to {},{}", x, y),\n    Message::Write(text) => println!("Text: {}", text),\n}' },
            { id:"re1-1", type:"choice", q:"enum в Rust может содержать?", opts:["Только имена","Данные","Только числа","Только строки"], answer:"Данные", xp:10 }
        ]},
        { id:"re2", title:"Option и Result", exercises:[
            { id:"re2-t1", type:"theory", q:"Option и Result", text:"Option<T> — Some(value) или None.\nResult<T, E> — Ok(value) или Err(error).\nВместо null и исключений!", code:'// Option\nfn find_user(id: u32) -> Option<String> {\n    if id == 1 {\n        Some(String::from("Alice"))\n    } else {\n        None\n    }\n}\n\n// Result\nfn divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        Err(String::from("Division by zero"))\n    } else {\n        Ok(a / b)\n    }\n}' },
            { id:"re2-1", type:"choice", q:"Option заменяет?", opts:["Исключения","null","Циклы","Функции"], answer:"null", xp:10 },
            { id:"re2-2", type:"choice", q:"Result заменяет?", opts:["null","Исключения","Циклы","Структуры"], answer:"Исключения", xp:10 },
            { id:"re2-3", type:"choice", q:"Some(5) — это?", opts:["Option с 5","Число 5","Result","Ошибка"], answer:"Option с 5", xp:10 }
        ]}
    ]},
    { id:"rust_errors", title:"Ошибки Rust", icon:"⚠️", desc:"Result, ?, unwrap", req:["rust_enums"], lessons:[
        { id:"rer1", title:"Обработка ошибок", exercises:[
            { id:"rer1-t1", type:"theory", q:"? оператор", text:"? — короткий способ пробросить ошибку. unwrap() — получить значение или паника.", code:'fn read_file() -> Result<String, io::Error> {\n    let content = std::fs::read_to_string("file.txt")?;\n    Ok(content)\n}\n\n// unwrap — опасно!\nlet value = some_option.unwrap();  // паника если None\n\n// Безопасные альтернативы\nlet value = some_option.unwrap_or(default);\nlet value = some_option.expect("должно быть значение");' },
            { id:"rer1-1", type:"choice", q:"? делает?", opts:["Проверяет null","Пробрасывает ошибку","Создаёт Result","Паникует"], answer:"Пробрасывает ошибку", xp:10 },
            { id:"rer1-2", type:"choice", q:"unwrap() при None/Err?", opts:["Возвращает None","Возвращает default","Паникует","Продолжает"], answer:"Паникует", xp:10 },
            { id:"rer1-3", type:"choice", q:"unwrap_or(0) при None?", opts:["Паника","0","None","Ошибка"], answer:"0", xp:10 }
        ]}
    ]}
];

var GO_PRACTICE = [
    { id:"gopractice_basics", title:"Go Основы", icon:"🐹", desc:"Базовые задачи", alwaysOpen:true, color:"#00ADD8", lessons:[
        { id:"gop1", title:"Hello Go", exercises:[
            { id:"gop1-1", type:"write", q:'Выведи "Hello, Go!"', answer:'fmt.Println("Hello, Go!")', xp:15 },
            { id:"gop1-2", type:"write", q:"Создай x := 10 и выведи", answer:'x := 10\nfmt.Println(x)', xp:15 },
            { id:"gop1-3", type:"write", q:"Выведи сумму 5 + 3", answer:'fmt.Println(5 + 3)', xp:15 },
            { id:"gop1-4", type:"write", q:'Выведи "Hello" и 42 через Println', answer:'fmt.Println("Hello", 42)', xp:15 },
            { id:"gop1-5", type:"write", q:"Создай const PI = 3.14", answer:'const PI = 3.14', xp:15 }
        ]}
    ]},
    { id:"gopractice_vars", title:"Go Переменные", icon:"📦", desc:"var и :=", alwaysOpen:true, color:"#00ADD8", lessons:[
        { id:"gop2", title:"Переменные", exercises:[
            { id:"gop2-1", type:"write", q:"Создай name := \"Alice\"", answer:'name := "Alice"', xp:15 },
            { id:"gop2-2", type:"write", q:"Создай var age int = 25", answer:'var age int = 25', xp:15 },
            { id:"gop2-3", type:"write", q:"Создай x, y := 10, 20", answer:'x, y := 10, 20', xp:15 },
            { id:"gop2-4", type:"write", q:"Поменяй местами x и y", answer:'x, y = y, x', xp:20 },
            { id:"gop2-5", type:"write", q:"Создай var active bool = true", answer:'var active bool = true', xp:15 }
        ]}
    ]},
    { id:"gopractice_slices", title:"Go Слайсы", icon:"📋", desc:"slice и append", alwaysOpen:true, color:"#00ADD8", lessons:[
        { id:"gop3", title:"Слайсы", exercises:[
            { id:"gop3-1", type:"write", q:"Создай слайс [1, 2, 3]", answer:"nums := []int{1, 2, 3}", xp:15 },
            { id:"gop3-2", type:"write", q:"Добавь 4 в слайс nums", answer:"nums = append(nums, 4)", xp:15 },
            { id:"gop3-3", type:"write", q:"Создай пустой слайс строк", answer:'names := []string{}', xp:15 },
            { id:"gop3-4", type:"write", q:"Создай слайс через make([]int, 5)", answer:'data := make([]int, 5)', xp:20 },
            { id:"gop3-5", type:"write", q:"Получи длину слайса nums", answer:'len(nums)', xp:15 }
        ]}
    ]},
    { id:"gopractice_maps", title:"Go Мапы", icon:"🗺️", desc:"map и delete", alwaysOpen:true, color:"#00ADD8", lessons:[
        { id:"gop4", title:"Мапы", exercises:[
            { id:"gop4-1", type:"write", q:"Создай map name->age", answer:'ages := map[string]int{"Alice": 25}', xp:20 },
            { id:"gop4-2", type:"write", q:"Создай пустую map[string]int", answer:'m := make(map[string]int)', xp:15 },
            { id:"gop4-3", type:"write", q:'Добавь "Bob": 30 в ages', answer:'ages["Bob"] = 30', xp:15 },
            { id:"gop4-4", type:"write", q:'Удали "Alice" из ages', answer:'delete(ages, "Alice")', xp:15 },
            { id:"gop4-5", type:"write", q:"Проверь есть ли Bob в ages", answer:'age, ok := ages["Bob"]', xp:20 }
        ]}
    ]},
    { id:"gopractice_funcs", title:"Go Функции", icon:"⚡", desc:"func и return", alwaysOpen:true, color:"#00ADD8", lessons:[
        { id:"gop5", title:"Функции", exercises:[
            { id:"gop5-1", type:"write", q:"Функция double(x int) int", answer:'func double(x int) int {\n    return x * 2\n}', xp:20 },
            { id:"gop5-2", type:"write", q:"Функция add(a, b int) int", answer:'func add(a, b int) int {\n    return a + b\n}', xp:20 },
            { id:"gop5-3", type:"write", q:"Функция greet(name string)", answer:'func greet(name string) {\n    fmt.Println("Hello,", name)\n}', xp:20 },
            { id:"gop5-4", type:"write", q:"Функция minMax(a, b int) (int, int)", answer:'func minMax(a, b int) (int, int) {\n    if a < b {\n        return a, b\n    }\n    return b, a\n}', xp:25 },
            { id:"gop5-5", type:"write", q:"Функция isEven(n int) bool", answer:'func isEven(n int) bool {\n    return n % 2 == 0\n}', xp:20 }
        ]}
    ]},
    { id:"gopractice_structs", title:"Go Структуры", icon:"🏗️", desc:"struct и методы", alwaysOpen:true, color:"#00ADD8", lessons:[
        { id:"gop6", title:"Структуры", exercises:[
            { id:"gop6-1", type:"write", q:"Структура Person с Name и Age", answer:'type Person struct {\n    Name string\n    Age  int\n}', xp:20 },
            { id:"gop6-2", type:"write", q:"Создай Person{\"Alice\", 25}", answer:'p := Person{Name: "Alice", Age: 25}', xp:20 },
            { id:"gop6-3", type:"write", q:"Метод (p Person) Greet() string", answer:'func (p Person) Greet() string {\n    return "Hello, " + p.Name\n}', xp:25 },
            { id:"gop6-4", type:"write", q:"Структура Rectangle с Width, Height", answer:'type Rectangle struct {\n    Width  int\n    Height int\n}', xp:20 },
            { id:"gop6-5", type:"write", q:"Метод (r Rectangle) Area() int", answer:'func (r Rectangle) Area() int {\n    return r.Width * r.Height\n}', xp:25 }
        ]}
    ]}
];

var RUST_PRACTICE = [
    { id:"rustpractice_basics", title:"Rust Основы", icon:"🦀", desc:"println! и let", alwaysOpen:true, color:"#CE422B", lessons:[
        { id:"rp1", title:"Hello Rust", exercises:[
            { id:"rp1-1", type:"write", q:'Выведи "Hello, Rust!"', answer:'println!("Hello, Rust!");', xp:15 },
            { id:"rp1-2", type:"write", q:"Создай let x = 42", answer:'let x = 42;', xp:15 },
            { id:"rp1-3", type:"write", q:"Выведи переменную x", answer:'println!("{}", x);', xp:15 },
            { id:"rp1-4", type:"write", q:'Выведи "x = {}" с x', answer:'println!("x = {}", x);', xp:15 },
            { id:"rp1-5", type:"write", q:"Создай const MAX: i32 = 100", answer:'const MAX: i32 = 100;', xp:15 }
        ]}
    ]},
    { id:"rustpractice_vars", title:"Rust Переменные", icon:"📦", desc:"let mut и типы", alwaysOpen:true, color:"#CE422B", lessons:[
        { id:"rp2", title:"Переменные", exercises:[
            { id:"rp2-1", type:"write", q:"Создай mut x = 10 и увеличь на 5", answer:'let mut x = 10;\nx += 5;', xp:15 },
            { id:"rp2-2", type:"write", q:'Создай let name: &str = "Alice"', answer:'let name: &str = "Alice";', xp:15 },
            { id:"rp2-3", type:"write", q:"Создай let pi: f64 = 3.14", answer:'let pi: f64 = 3.14;', xp:15 },
            { id:"rp2-4", type:"write", q:"Shadowing: let x = x + 1", answer:'let x = 5;\nlet x = x + 1;', xp:20 },
            { id:"rp2-5", type:"write", q:"Создай let (a, b) = (1, 2)", answer:'let (a, b) = (1, 2);', xp:15 }
        ]}
    ]},
    { id:"rustpractice_vecs", title:"Rust Векторы", icon:"📋", desc:"Vec и методы", alwaysOpen:true, color:"#CE422B", lessons:[
        { id:"rp3", title:"Векторы", exercises:[
            { id:"rp3-1", type:"write", q:"Создай вектор vec![1, 2, 3]", answer:"let nums = vec![1, 2, 3];", xp:15 },
            { id:"rp3-2", type:"write", q:"Создай пустой Vec<i32>", answer:'let mut nums: Vec<i32> = Vec::new();', xp:15 },
            { id:"rp3-3", type:"write", q:"Добавь 4 в nums", answer:'nums.push(4);', xp:15 },
            { id:"rp3-4", type:"write", q:"Получи длину вектора", answer:'nums.len()', xp:15 },
            { id:"rp3-5", type:"write", q:"Удали последний элемент", answer:'nums.pop();', xp:15 }
        ]}
    ]},
    { id:"rustpractice_funcs", title:"Rust Функции", icon:"⚡", desc:"fn и return", alwaysOpen:true, color:"#CE422B", lessons:[
        { id:"rp4", title:"Функции", exercises:[
            { id:"rp4-1", type:"write", q:"Функция square(x: i32) -> i32", answer:'fn square(x: i32) -> i32 {\n    x * x\n}', xp:20 },
            { id:"rp4-2", type:"write", q:"Функция add(a: i32, b: i32) -> i32", answer:'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}', xp:20 },
            { id:"rp4-3", type:"write", q:"Функция is_positive(n: i32) -> bool", answer:'fn is_positive(n: i32) -> bool {\n    n > 0\n}', xp:20 },
            { id:"rp4-4", type:"write", q:"Функция greet(name: &str)", answer:'fn greet(name: &str) {\n    println!("Hello, {}!", name);\n}', xp:20 },
            { id:"rp4-5", type:"write", q:"Функция factorial(n: u32) -> u32", answer:'fn factorial(n: u32) -> u32 {\n    if n <= 1 { 1 } else { n * factorial(n - 1) }\n}', xp:25 }
        ]}
    ]},
    { id:"rustpractice_structs", title:"Rust Структуры", icon:"🏗️", desc:"struct и impl", alwaysOpen:true, color:"#CE422B", lessons:[
        { id:"rp5", title:"Структуры", exercises:[
            { id:"rp5-1", type:"write", q:"Структура Point с x, y", answer:'struct Point {\n    x: i32,\n    y: i32,\n}', xp:20 },
            { id:"rp5-2", type:"write", q:"Создай Point { x: 10, y: 20 }", answer:'let p = Point { x: 10, y: 20 };', xp:20 },
            { id:"rp5-3", type:"write", q:"Структура Rectangle с width, height", answer:'struct Rectangle {\n    width: u32,\n    height: u32,\n}', xp:20 },
            { id:"rp5-4", type:"write", q:"impl Rectangle с методом area(&self) -> u32", answer:'impl Rectangle {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n}', xp:25 },
            { id:"rp5-5", type:"write", q:"Метод new(w: u32, h: u32) -> Rectangle", answer:'impl Rectangle {\n    fn new(w: u32, h: u32) -> Rectangle {\n        Rectangle { width: w, height: h }\n    }\n}', xp:25 }
        ]}
    ]},
    { id:"rustpractice_ownership", title:"Rust Владение", icon:"🔐", desc:"borrow и &", alwaysOpen:true, color:"#CE422B", lessons:[
        { id:"rp6", title:"Владение", exercises:[
            { id:"rp6-1", type:"write", q:"Создай String и клонируй", answer:'let s1 = String::from("hello");\nlet s2 = s1.clone();', xp:20 },
            { id:"rp6-2", type:"write", q:"Функция с заимствованием &String", answer:'fn print_len(s: &String) {\n    println!("{}", s.len());\n}', xp:20 },
            { id:"rp6-3", type:"write", q:"Функция с &mut String", answer:'fn add_world(s: &mut String) {\n    s.push_str(" world");\n}', xp:25 },
            { id:"rp6-4", type:"write", q:"Срез строки &str", answer:'let s = String::from("hello");\nlet slice = &s[0..2];', xp:20 },
            { id:"rp6-5", type:"write", q:"Функция принимающая &str", answer:'fn greet(name: &str) {\n    println!("Hello, {}!", name);\n}', xp:20 }
        ]}
    ]}
];

if (typeof window !== "undefined") {
    window.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
    window.COURSE_SKILLS = COURSE_SKILLS;
    window.PRACTICE_SKILLS = PRACTICE_SKILLS;
    window.JS_SKILLS = JS_SKILLS;
    window.JS_PRACTICE = JS_PRACTICE;
    window.HTML_SKILLS = HTML_SKILLS;
    window.HTML_PRACTICE = HTML_PRACTICE;
    window.SQL_SKILLS = SQL_SKILLS;
    window.SQL_PRACTICE = SQL_PRACTICE;
    window.GO_SKILLS = GO_SKILLS;
    window.GO_PRACTICE = GO_PRACTICE;
    window.RUST_SKILLS = RUST_SKILLS;
    window.RUST_PRACTICE = RUST_PRACTICE;

    window.getSkillsByLanguage = function(lang) {
        switch(lang) {
            case "python": return COURSE_SKILLS;
            case "javascript": return JS_SKILLS;
            case "html": return HTML_SKILLS;
            case "sql": return SQL_SKILLS;
            case "go": return GO_SKILLS;
            case "rust": return RUST_SKILLS;
            default: return COURSE_SKILLS;
        }
    };

    window.getPracticeByLanguage = function(lang) {
        switch(lang) {
            case "python": return PRACTICE_SKILLS;
            case "javascript": return JS_PRACTICE;
            case "html": return HTML_PRACTICE;
            case "sql": return SQL_PRACTICE;
            case "go": return GO_PRACTICE;
            case "rust": return RUST_PRACTICE;
            default: return [];
        }
    };

    var totalSkills = COURSE_SKILLS.length + JS_SKILLS.length + HTML_SKILLS.length + SQL_SKILLS.length + GO_SKILLS.length + RUST_SKILLS.length;
    var totalLessons = 0;
    var totalExercises = 0;
    var totalPractice = 0;
    
    [COURSE_SKILLS, JS_SKILLS, HTML_SKILLS, SQL_SKILLS, GO_SKILLS, RUST_SKILLS].forEach(function(skills) {
        skills.forEach(function(s) {
            totalLessons += s.lessons.length;
            s.lessons.forEach(function(l) {
                totalExercises += l.exercises.length;
            });
        });
    });
    
    [PRACTICE_SKILLS, JS_PRACTICE, HTML_PRACTICE, SQL_PRACTICE, GO_PRACTICE, RUST_PRACTICE].forEach(function(practice) {
        practice.forEach(function(p) {
            p.lessons.forEach(function(l) {
                totalPractice += l.exercises.length;
            });
        });
    });

    console.log("✅ Course data loaded:");
    console.log("   🐍 Python:", COURSE_SKILLS.length, "topics,", COURSE_SKILLS.reduce(function(s,sk){return s+sk.lessons.length},0), "lessons,", PRACTICE_SKILLS.length, "practices");
    console.log("   🟨 JavaScript:", JS_SKILLS.length, "topics,", JS_SKILLS.reduce(function(s,sk){return s+sk.lessons.length},0), "lessons,", JS_PRACTICE.length, "practices");
    console.log("   🌐 HTML/CSS:", HTML_SKILLS.length, "topics,", HTML_SKILLS.reduce(function(s,sk){return s+sk.lessons.length},0), "lessons,", HTML_PRACTICE.length, "practices");
    console.log("   🗄️ SQL:", SQL_SKILLS.length, "topics,", SQL_SKILLS.reduce(function(s,sk){return s+sk.lessons.length},0), "lessons,", SQL_PRACTICE.length, "practices");
    console.log("   🐹 Go:", GO_SKILLS.length, "topics,", GO_SKILLS.reduce(function(s,sk){return s+sk.lessons.length},0), "lessons,", GO_PRACTICE.length, "practices");
    console.log("   🦀 Rust:", RUST_SKILLS.length, "topics,", RUST_SKILLS.reduce(function(s,sk){return s+sk.lessons.length},0), "lessons,", RUST_PRACTICE.length, "practices");
    console.log("   📊 Total:", totalSkills, "topics,", totalLessons, "lessons,", totalExercises, "exercises,", totalPractice, "practice tasks");
}
