import path from 'node:path';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const connectionString = process.env.DATABASE_URL ?? '';

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'rust',
  'go',
  'java',
  'cpp',
  'c',
  'ruby',
  'php',
] as const;

const ROAST_TEMPLATES = {
  javascript: [
    "Your code is so messy, even your console.logs are confused about what's happening.",
    "I've seen more structure in a bowl of spaghetti than in this JavaScript.",
    'Your variable names look like you typed them while having a seizure.',
    'This is why people say JavaScript is a toy language. Thanks for proving them right.',
    'Your async/await usage is giving me anxiety. Have you considered meditation?',
  ],
  typescript: [
    "You have more 'any' types than my bank account has money.",
    'TypeScript is trying its best to save you, but you keep running away.',
    "This code would compile, but your dignity wouldn't survive the review.",
    "Every 'as any' in this file is a crime against type safety.",
    'Your generics are so nested, I need a map to find the return type.',
  ],
  python: [
    'Your Python code proves you learned from tutorials from 2008.',
    "Indentation error? No, that's just your code crying for help.",
    "I've seen more loops in a racetrack than in your unoptimized Python.",
    'Your function names are so long, they need their own commit message.',
    'This is why people think Python is only for beginners.',
  ],
  rust: [
    'Your Rust code has more unwraps than a birthday present.',
    "I've seen safer code at a fireworks factory.",
    "The compiler is screaming at you, and honestly? It's earned the right.",
    'Your lifetime annotations make no sense even to the borrow checker.',
    'This is why Rust has a steep learning curve - cases like yours.',
  ],
  go: [
    'Your Go code is so simple, even a Go template could write it better.',
    "Error handling? Never heard of it. You're just asking for panic.",
    "This is the most verbose way to do nothing I've ever seen.",
    'Your goroutines are more confused than a cat in a mirror maze.',
    'Go is simple. Your implementation is not.',
  ],
  java: [
    'You managed to write 500 lines where 50 would suffice. Impressive, in a bad way.',
    'Your class hierarchy is deeper than my student loans.',
    'Enterprise Java at its finest - maximum boilerplate, minimum logic.',
    'Spring Boot did everything except write this code for you.',
    'Your design patterns are more confusing than the plot of Inception.',
  ],
  cpp: [
    "Memory management in 2024 and you're still using raw pointers? Bold strategy.",
    'This code has more undefined behaviors than a horror movie.',
    "I've seen safer code in a nuclear power plant control system.",
    'Your includes are more nested than a Russian doll factory.',
    "C++ is hard. Your code is harder. I'm going to take a nap.",
  ],
  c: [
    'Buffer overflows are not a feature, no matter how much you treat them as one.',
    'This code would make Dennis Ritchie cry.',
    'Your malloc/free balance is more off than my sleep schedule.',
    "I've seen more #defines in a preprocessor tutorial than in production code.",
    "This is why people say C is dangerous. You've single-handedly proven them right.",
  ],
  ruby: [
    "Your Ruby code reads like a haiku written by someone who's never read a haiku.",
    "Rails magic is not an excuse for code magic that doesn't exist.",
    "This is why people say Ruby is dead. You've killed it.",
    'Your Ruby code has more meta-programming than actual programming.',
    'Blocks, procs, lambdas - and yet somehow still no structure.',
  ],
  php: [
    'Your PHP code is a security vulnerability with extra steps.',
    "I've seen more SQL injection vulnerabilities in movies than in real life. Until now.",
    'This is why WordPress has a reputation.',
    "Your PHP would run on PHP 4 and that's not a compliment.",
    'The only thing getting roasted here is your understanding of types.',
  ],
};

const HONEST_TEMPLATES = [
  'The code has some issues with naming conventions that could be improved for readability.',
  'Consider extracting this logic into smaller, more focused functions.',
  'The error handling could be more robust in this section.',
  'This would benefit from adding type annotations or interfaces.',
  'The performance could be improved by caching the results of this expensive operation.',
  "There's some code duplication here that could be refactored into a shared utility.",
  'Consider adding input validation before processing the data.',
  'The function is doing too many things and would benefit from the single responsibility principle.',
  'Adding comments would help explain the business logic in this section.',
  'The database queries could be optimized to reduce the number of round trips.',
];

type Language = (typeof LANGUAGES)[number];
type RoastMode = 'honest' | 'roast';

function getRandomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateScore(): number {
  return (
    Math.round(
      (Math.random() * 10 + faker.number.float({ min: 0, max: 2 })) * 10,
    ) / 10
  );
}

function generateCode(language: Language): string {
  const codeSnippets: Record<Language, string[]> = {
    javascript: [
      'function add(a,b){return a+b}',
      'const x = prompt("hi")',
      'eval(userInput)',
      'var foo = "bar"',
      'setTimeout(()=>{},0)',
    ],
    typescript: [
      'const x: any = "hello"',
      'interface Foo { [key: string]: any }',
      'function f<T>(x: T): T { return x as any; }',
      'type Foo = { [K in string]: unknown };',
      'const arr: Array<any> = [];',
    ],
    python: [
      'def foo(): pass',
      'x = []\nfor i in range(1000):\n    x.append(i)',
      'import * as everything',
      'def do_stuff(a,b,c,d,e): return a+b+c+d+e',
      'x = 1\ny = 2',
    ],
    rust: [
      'let mut x = vec![];',
      'unsafe { *ptr }',
      'fn foo() -> Option<T> { Some(unsafe { std::ptr::read(&x) }) }',
      'impl<T> Foo<T> where T: Trait { pub fn bar(&self) -> &T { unimplemented!() } }',
      'let result = std::fs::read_to_string("file").unwrap();',
    ],
    go: [
      'func foo() error { return nil }',
      'resp, _ := http.Get(url)',
      'var m map[string]interface{}',
      'if err != nil { panic(err) }',
      'go func() { ch <- result }()',
    ],
    java: [
      'public class Foo { public static void main(String[] args) {} }',
      'List<Object> list = new ArrayList<>();',
      '@Autowired private Service service;',
      'Optional.ofNullable(obj).orElse(null);',
      'for (int i = 0; i < 1000; i++) { list.add(i); }',
    ],
    cpp: [
      'int* ptr = new int[1000];',
      '#define MAX(a,b) a>b?a:b',
      'std::vector<int*> pointers;',
      'void* data = malloc(1024);',
      'class Foo {}; Foo* f = new Foo();',
    ],
    c: [
      '#define TRUE 1',
      'int* ptr = malloc(sizeof(int) * 100);',
      'void foo() { goto end; }',
      'char buf[10]; gets(buf);',
      'int arr[100]; for(int i=0;i<100;i++)arr[i]=i;',
    ],
    ruby: [
      'def foo; @bar ||= compute_expensive_value; end',
      'class_eval { define_method(:foo) { |*args| } }',
      'send(params[:method].to_sym)',
      'result = execute(sql.gsub(/.*/, ""))',
      '@@instances ||= []',
    ],
    php: [
      '$result = mysql_query("SELECT * FROM users WHERE id=" . $_GET["id"]);',
      '$arr = []; foreach($data as $d) { $arr[] = $d; }',
      'function foo($x) { return $x; }',
      'class Foo { public $bar; }',
      '$x = "{$y}"; eval($x);',
    ],
  };

  return getRandomElement(codeSnippets[language]);
}

function generateRoastContent(language: Language, mode: RoastMode): string {
  if (mode === 'honest') {
    return getRandomElement(HONEST_TEMPLATES);
  }

  const templates = ROAST_TEMPLATES[language];
  return getRandomElement(templates);
}

async function seed() {
  console.log('🌱 Starting seed...');

  const client = postgres(connectionString);

  try {
    await client`SELECT 1`;
    console.log('✅ Connected to database');

    const submissions: Array<{
      id: string;
      code: string;
      language: Language;
      roastMode: RoastMode;
      score: number;
    }> = [];

    console.log('📝 Generating submissions...');

    for (let i = 0; i < 100; i++) {
      const language = getRandomElement(LANGUAGES);
      const roastMode: RoastMode = Math.random() > 0.3 ? 'roast' : 'honest';
      const score = generateScore();

      const result = await client`
        INSERT INTO submissions (code, language, roast_mode, score)
        VALUES (${generateCode(language)}, ${language}, ${roastMode}, ${score})
        RETURNING id
      `;

      submissions.push({
        id: result[0].id,
        language,
        roastMode,
        code: generateCode(language),
        score,
      });

      const analysisContent = generateRoastContent(language, roastMode);

      await client`
        INSERT INTO analyses ("submissionId", content, roast_mode)
        VALUES (${result[0].id}, ${analysisContent}, ${roastMode})
      `;
    }

    console.log(`✅ Inserted 100 submissions with analyses`);

    const stats = await client`
      SELECT 
        COUNT(*)::int as total,
        AVG(score) as avg_score,
        MIN(score) as min_score,
        MAX(score) as max_score
      FROM submissions
    `;

    console.log('📊 Database stats:', stats[0]);

    console.log('🎉 Seed completed!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
