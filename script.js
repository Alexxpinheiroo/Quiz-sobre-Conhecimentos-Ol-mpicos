document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const backToStartBtn = document.getElementById("back-to-start-btn");
    const quizStart = document.getElementById("quiz-start");
    const quizQuestion = document.getElementById("quiz-question");
    const quizEnd = document.getElementById("quiz-end");
    const questionElem = document.getElementById("question");
    const scoreValue = document.getElementById("score-value");
    const feedbackElem = document.getElementById("feedback");

    // Dados do quiz
    const questions = [
        {
            question: "Em Qual cidade foi as Olimpíadas de Verão de 2024?",
            options: ["Paris", "Los Angeles", "Tóquio", "Londres"],
            answer: "Paris"
        },
        {
            question: "Em qual ano as Olimpíadas de Paris ocorreu?",
            options: ["2020", "2022", "2024", "2026"],
            answer: "2024"
        },
        {
            question: "Qual foi o mês de abertura das Olimpíadas de Paris 2024?",
            options: ["Junho", "Julho", "Agosto", "Setembro"],
            answer: "Julho"
        },
        {
            question: "Qual esporte fez sua estreia nos Jogos Olímpicos de Paris 2024?",
            options: ["Skate", "Surfe", "Ambos", "Nenhum dos dois"],
            answer: "Ambos"
        },
        {
            question: "Qual monumento icônico serviu como cenário para a Cerimônia de Abertura das Olimpíadas de Paris 2024?",
            options: ["Torre Eiffel", "Arco do Triunfo", "Catedral de Notre Dame", "Seine"],
            answer: "Seine"
        },
        {
            question: "Qual país liderou o quadro de medalhas nos Jogos Olímpicos de Paris 2024?",
            options: ["Estados Unidos", "China", "França", "Austrália"],
            answer: "Estados Unidos"
        },
        {
            question: "Qual país sediou as Olimpíadas de 2016?",
            options: ["Brasil", "França", "Japão", "EUA"],
            answer: "Brasil"
        },
        {
            question: "Qual é o mascote das Olimpíadas de Tóquio 2020?",
            options: ["Miraitowa", "Sakura", "Kumo", "Akira"],
            answer: "Miraitowa"
        },
        {
            question: "Quantos esportes foram incluídos nas Olimpíadas de 2020?",
            options: ["33", "32", "30", "28"],
            answer: "33"
        },
        {
            question: "Quem é o atleta com mais medalhas de ouro em Olimpíadas?",
            options: ["Michael Phelps", "Usain Bolt", "Larisa Latynina", "Paavo Nurmi"],
            answer: "Michael Phelps"
        },
        {
            question: "Em que ano foram realizadas as primeiras Olimpíadas da Era Moderna?",
            options: ["1896", "1900", "1904", "1912"],
            answer: "1896"
        },
        {
            question: "Qual país tem o maior número de medalhas de ouro em Olimpíadas de verão?",
            options: ["EUA", "Reino Unido", "Alemanha", "França"],
            answer: "EUA"
        },
        {
            question: "Qual é o símbolo das Olimpíadas?",
            options: ["Cinco anéis entrelaçados", "Uma tocha", "Um atleta correndo", "Uma medalha"],
            answer: "Cinco anéis entrelaçados"
        },
        {
            question: "Qual esporte foi adicionado aos Jogos Olímpicos pela primeira vez em Tóquio 2020?",
            options: ["Skate", "Surfe", "Ambos", "Nenhum dos dois"],
            answer: "Ambos"
        },
        {
            question: "Em qual continente nunca foram realizadas as Olimpíadas de Verão?",
            options: ["África", "Antártida", "Oceania", "América do Sul"],
            answer: "Antártida"
        },
        {
            question: "Qual é o significado dos cinco anéis olímpicos?",
            options: ["Representam os cinco continentes", "Simbolizam a união dos atletas", "São uma homenagem aos deuses gregos", "Nenhuma das alternativas"],
            answer: "Representam os cinco continentes"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function showElement(element) {
        element.classList.remove("hidden");
    }

    function hideElement(element) {
        element.classList.add("hidden");
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElem.textContent = currentQuestion.question;

            // Embaralha as opções
            const shuffledOptions = shuffleArray([...currentQuestion.options]);

            const options = document.querySelectorAll("#quiz-question .option");
            options.forEach((option, index) => {
                option.textContent = shuffledOptions[index] || '';
                option.onclick = () => checkAnswer(shuffledOptions[index]);
            });

            hideElement(feedbackElem); // Ocultar feedback ao mostrar a pergunta
            showElement(quizQuestion);
            hideElement(quizStart);
            hideElement(quizEnd);
            showElement(backToStartBtn); // Mostrar botão "Voltar ao Início"
        } else {
            showResult();
        }
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion) {
            const correctAnswer = currentQuestion.answer;
            if (selectedOption === correctAnswer) {
                score++;
                feedbackElem.textContent = "Você acertou!";
                feedbackElem.style.color = "green";
            } else {
                feedbackElem.textContent = `Você errou! A resposta certa é ${correctAnswer}.`;
                feedbackElem.style.color = "red";
            }
            feedbackElem.classList.remove("hidden");
            setTimeout(() => {
                feedbackElem.classList.add("hidden");
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion(); // Mostrar a próxima pergunta
                } else {
                    showResult();
                }
            }, 1000); // Mostra feedback por 1 segundo antes de passar para a próxima pergunta
        } else {
            console.error('Pergunta não encontrada para o índice:', currentQuestionIndex);
        }
    }

    function showResult() {
        scoreValue.textContent = score;
        hideElement(backToStartBtn); // Ocultar botão "Voltar ao Início"
        showElement(quizEnd);
        hideElement(quizStart);
        hideElement(quizQuestion);
    }

    startBtn.addEventListener("click", () => {
        currentQuestionIndex = 0; // Resetar o índice da pergunta ao iniciar o quiz
        score = 0; // Resetar a pontuação ao iniciar o quiz
        showQuestion();
    });

    restartBtn.addEventListener("click", () => {
        score = 0;
        currentQuestionIndex = 0;
        showElement(quizStart);
        hideElement(quizQuestion);
        hideElement(quizEnd);
        hideElement(backToStartBtn); // Ocultar botão "Voltar ao Início"
    });

    backToStartBtn.addEventListener("click", () => {
        showElement(quizStart);
        hideElement(quizQuestion);
        hideElement(quizEnd);
        hideElement(backToStartBtn); // Ocultar botão "Voltar ao Início" ao voltar ao início
    });
});
