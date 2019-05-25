// 能发送ajax的请求函数模块
//这个函数返回是一个Promise对象
import axios from 'axios';

export default function ajax(url, type='GET', data={}){
    if(type === 'GET'){
        // 请求参数串
        //data: {username: 'tom', password: '123'}
        //paramStr: username=tom&password=123
        let paramStr = '';
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&';
        });
        if(paramStr){
            //substring()提取字符串中介于两个指定下标之间的字符。
            //返回一个新的字符串，该字符串值包含 stringObject 的一个子字符串，
            // 其内容是从 start 处到 stop-1 处的所有字符，其长度为 stop 减 start。
            //slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。
            //返回一个新的字符串。包括字符串 stringObject 从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
            paramStr = paramStr.substring(0, paramStr.length - 1);
        }
        // 使用axios发送get请求
        return axios.get(url + '?' + paramStr)
    } else{
        //使用ajax发送POST请求
        return axios.post(url,data)
    }
}