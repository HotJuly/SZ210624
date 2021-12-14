function mapButtons(buttons){
    const mapObj = {};
    buttons.forEach((buttonStr)=>{
        mapObj[buttonStr]=true;
    })
    return mapObj
}

export default mapButtons;