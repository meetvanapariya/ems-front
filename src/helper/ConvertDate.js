export const converDateUserProfile = (dateData) => {
    var output = ''
    if(dateData)
    {
        const convertedDate = new Date(dateData);
        var year = convertedDate.getFullYear(); 
        var month = ("0" + (convertedDate.getMonth() + 1)).slice(-2);
        var date = ("0" + convertedDate.getDate()).slice(-2)

        output = year+'-'+month+'-'+date
    }
  
    return output;
}