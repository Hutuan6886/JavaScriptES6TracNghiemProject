//todo: sử dụng tính chất kế thừa lại từ lớp đối tượng question
class ChoiceAnswer extends Question{
    constructor(type,id,content,answers){
        super(type,id,content,answers); //* các khai báo biến của lớp Question sẽ được kế thừa tất cả lại 
    }

    render(){

        //todo: Duyệt mảng đáp án để hiển thị ra 4 đáp án
            //todo: Bởi vì mỗi câu có 1 mảng answer chứa 4 đáp án, nên phải duyệt mảng answer và tạo ra 4 html động của 4 đáp án đó, nội dung của 4 đáp án đó là content(res.data.answers.content)
        let answersHtml = "";

        //! this là 1 đối tượng question, còn item là đối tượng answers của question đó.

        for (let item of this.answers){
        
            answersHtml += `
            <div>
                <input value="${item.id}" class="answer-${this.id}" type="radio" name="answer-${this.id}"/>
                <label class="lead">${item.content}</label>
            </div>
            `;
        }
        //! phải set name="answer-${this.id}" cho ô input cùng tên nhau để khi tick sẽ chỉ tick được 1 cái, ${this.id} sẽ giúp phân biệt được đáp án của mỗi câu 

        //todo: hiện html câu hỏi và đáp án check
        return `
        <div>
            <p class="lead font-italic" style="front-size: 30px">
                Câu ${this.id}: ${this.content}
            </p>  
            ${answersHtml}  
        </div>
        `; 
    }
    //todo: Phương thức check đáp án 
    checkExact(){
        //todo: phải dom vào đáp án được check
        //todo: dom tới đáp án của câu hỏi nào tương ứng vs đối tượng this.id
        const answerCheckedList = document.getElementsByClassName(`answer-${this.id}`); //* đây chính là dom tới <input value="${item.id}" class="answer-${this.id}" type="radio" name="answer-${this.id}"/>

        //! mỗi this(mỗi câu) có id tương ứng, và trong mỗi đối tượng this có các answers, trong các answers đó có 4 id tương ứng cho 4 đáp án, vì vậy sẽ gán giá trị id của answers thành giá trị value (value="${item.id}")

        //todo: lấy id của answers của ô được check
        //todo: duyệt mảng answerCheckedList là duyệt tất cả các đáp án (có 16 đáp án cho 8 câu)
        let idAnswer;
        for (let answerChecked of answerCheckedList){

            //todo: Nếu đáp án có được checked, thì gán id đáp án đó (chính là giá trị value được tạo ra phía trên) cho biến hứng id
            if(answerChecked.checked){
                idAnswer = answerChecked.value;
                console.log(answerChecked);
                console.log(idAnswer);
            }
        }
        // console.log(idAnswer);
        //todo: trong trường hợp nếu không có đáp án nào được cheked thì vòng for và if phía trên sẽ vô nghĩa, idAnswer là undefine
        //todo: và lúc này sẽ ngừng tại đây
        if (idAnswer === 0){
            return false;
        }
        //todo: sau đó kiểm tra vào thuộc tính exact của đáp án được chọn là true hay false, dữ liệu đáp án được tạo từ backend đều có nhiều thuộc tính trong đó

            //todo: thực hiện duyệt mảng đáp án của đối tượng question(this), lấy ra 4 id của đáp án, sau đó so sánh với id vừa được lấy ra phía trên thì return ra true hoặc false(tương ứng với thuộc tính exact của đáp án đó)
        for(let answers of this.answers){
            if (idAnswer === answers.id){
                return answers.exact;  //* exact mang true hoặc false
            }
        }

        //todo: sau khi xây dựng được hàm kiểm tra đúng sai thì bên hàm main() xây dượng hàm để tính điểm sau khi ấn nút submit
            //todo: bằng cách duyệt mảng questionList sau đó set điều kiện nếu item.checkExact trong mảng questionList là true thì tăng biến đếm, số biến đếm là số câu đúng 
    }
}