//todo: Tạo lớp đối tượng câu hỏi, nên tạo trùng với backend
    //todo: loại câu hỏi là check hay điền ô trống
    //todo: id của câu hỏi
    //todo: nội dung của câu hỏi(tiêu đề câu hỏi)
    //todo: đáp án câu hỏi(4 đáp án đề chọn, hoặc đáp án nhập vào khung)

    //todo: phương thức để check đáp án sai hay đúng
    //todo: phương thức hiển thị câu hỏi ra bên ngoài. Phương thức này sẽ tạo các html gồm 1 tiêu đề và 4 đáp án check, hoặc 1 tiêu đề và ô trống điền vô, chỉ cần gọi phương thức và sử dụng cho các câu hỏi


//todo:------------------------------------------------------------------
//todo: Trong file main sẽ xây dựng các chức năng
    //todo: fetch dữ liệu
    let questionList = [];    //* tạo biến để hứng dữ liệu từ backend trả về
    const fetchQuestion = async () => {
        try {
            const res = await axios({
                url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/questions",
                method: "GET",
            });

            return res.data //* call api thành công thì sẽ trả ra giá trị data
        }
        catch(err){
            console.log(err);
        }
    }

    //todo: sau khi data đổ về, phải tạo lớp đối tượng theo dạng ChoiceAnswer và FillinAnswer để push vào trong questionList, sau đó mới render ra được
        //todo: hàm mapData này được chạy ngay sau khi call Api thành công
    const mapData = (data) => {   //* data input chính là data từ backend trả về
        //* duyệt mảng data backend trả về
        questionList = data.map((item) => {
            if (item.questionType === 1){
                return new ChoiceAnswer(item.questionType,item.id,item.content,item.answers);
            }
            else{
                return new FillinAnswer(item.questionType,item.id,item.content,item.answers);
            }
        });
    }

    //todo: sau khi call api lên backend lấy dữ liệu thì backend sẽ trả về 1 mảng nhiều câu hỏi, để hiển thị phải xây dựng function để hiển thị các câu hỏi đó bằng các duyệt mảng các giá trị bakend trả về
    const renderQuestion = () => {
        let questionHtml = "";
        for (let item of questionList){
            questionHtml += item.render();
        }
        document.getElementById("questionsContainer").innerHTML = questionHtml;
        console.log(questionList);
    }

    
    fetchQuestion().then((data) => {
        //todo: sau khi hàm fetchQuestion trả ra giá trị data, thì đối tượng từ backend sẽ được chuyển đổi sang frontend bằng hàm mapData
        //todo: đối tượng từ backend sau khi được chuyển đối sang frontend thì sẽ được thừa hưởng các phương thức được tạo trong frontend
        //todo: hàm fetchQuestion() khi return ra res.data thì hàm then() sẽ lấy được thông số trả ra là data, và lấy data đó truyền vô hàm mapData() để chuyển đổi
        mapData(data);
        //! code của fetchQuestion đã chạy xong sẽ chạy tới code trong này,
        //* Nghĩa là code trong đây sẽ chạy sau khi lấy được xong dữ liệu 
        renderQuestion();
    });


    //todo: Tạo hàm kiểm tra kết quả 
        //todo: bằng cách duyệt mảng questionList sau đó set điều kiện nếu item.checkExact trong mảng questionList là true thì tăng biến đếm, số biến đếm là số câu đúng 

    const score = () => {
        let result = 0;
        for(let item of questionList){
            if(item.checkExact()){
                result = result + 1;
            }
        }
        alert(`Điểm của bạn là ${result}/${questionList.length}`);
    }
    document.getElementById("btnSubmit").addEventListener("click",() => {
        score();
    });