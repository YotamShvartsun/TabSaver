/** *
 * opens a new tab
 * @param {string} url url to open
 * @param {boolean} isActive is active tab
 */
export function openUrl(url, isActive) {
    let urlTmp = url;
    if (!urlTmp.includes('http')) {
        // eslint-disable-next-line no-param-reassign
        urlTmp = `http://${urlTmp}`;
    }
    chrome.tabs.create({
        url: urlTmp,
        active: isActive,
    });
}
export default {
    url: openUrl,
};
