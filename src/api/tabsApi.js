/***
 * opens a new tab
 * @param {string} url url to open
 * @param {boolean} active is active tab
 */
export function openUrl(url, active)
{
    chrome.tabs.create({
        url:url, 
        active: active,
    });
}