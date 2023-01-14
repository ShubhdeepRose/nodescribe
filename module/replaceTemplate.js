module.exports = (temp, json, pageType) => {
    let output = temp.replace(/{%ID%}/g, json.id)
    output = output.replace(/{%TITLE%}/g, json.title)
    if (pageType === "summary") {
        output = output.replace(/{%DESCRIPTION%}/g, json.description.slice(0, json.description.slice(0, 100).lastIndexOf(" ")))
    } else {
        output = output.replace(/{%DESCRIPTION%}/g, json.description)
    }
    output = output.replace(/{%IMAGE_PLACEHOLDER%}/g, json.image)
    return output;
}