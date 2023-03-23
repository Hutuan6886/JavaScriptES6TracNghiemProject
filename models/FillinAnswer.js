//todo: sử dụng tính chất kế thừa lại từ lớp đối tượng question
class FillinAnswer extends Question{
    constructor(type,id,content,answers){
        super(type,id,content,answers); //* các khai báo biến của lớp Question sẽ được kế thừa tất cả lại 
    }

    render(){
        return `
        <div>
            <p class="lead font-italic" style="front-size: 30px">
                Câu ${this.id}: ${this.content}
            </p>
        </div>
        <input type="text" id="answer-${this.id}" class="form-control w-50"/>
        `
    }

    checkExact(){
        //todo: dom tới ô input để lấy giá trị answer
        const answerInputList = document.getElementById(`answer-${this.id}`).value;
        console.log(answerInputList);

        for (let answer of this.answers){
            if(answerInputList.toLowerCase() === answer.content.toLowerCase()){
                return true;
            }
            else{
                return false;
            }
        }
    }
}