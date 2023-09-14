const apiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple';

const button = document.getElementById('fetch');


button.addEventListener('click', async e => {
    console.log('1. Clicked');

    const response = await fetch(apiUrl);
    console.log('2. response:', response);


    const quizData = await response.json();
    console.log('3. got data:', quizData);

    const questions = quizData.results;
    createQuestions(questions);


})


const createQuestions = (questions) => {
    const questionContainer = document.getElementById('questions');

    questions.forEach(question => {
        const questionElement = createQuestionElement(question);
        questionContainer.appendChild(questionElement);
            
    });
}

const createQuestionElement = (question) => {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const questionHeading = document.createElement('h2');
    questionHeading.innerHTML = question.question;

    questionElement.appendChild(questionHeading);


  //  let options = [...question.incorrect_answers, question.correct_answer ];
    let options = question.incorrect_answers;
    const randomIndex = Math.floor(Math.random() * 4);
    options.splice(randomIndex, 0, question.correct_answer);
    
    options.forEach( option => {
        const optionElement = createOptionElement(option, question.correct_answer);
        questionElement.appendChild(optionElement);
    
    })

    return questionElement;
}

const createOptionElement = (option, correct_answer) => {
    const optionElemet = document.createElement('div');
    optionElemet.className = 'option';
    optionElemet.innerHTML = option;

    optionElemet.addEventListener('click', e => { 
        if(option === correct_answer) {
            optionElemet.classList.add('correct');
            console.log('correct answer');
        } else {
            optionElemet.classList.add('wrong');
            console.log('wrong answer');
        }
        

    })  

    return optionElemet;



}