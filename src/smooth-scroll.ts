/*! smooth-scroll v1.0.1 | MIT | https://github.com/hd-code/web-snippets */

document.addEventListener('DOMContentLoaded', () => {
    const links = document.links;
    for (let i = 0, ie = links.length; i < ie; i++) {
        handleLink(links[i] as HTMLAnchorElement);
    }

    function handleLink(link: HTMLAnchorElement) {
        // stop func if link doesn't refer to the current page
        if (link.hostname !== location.hostname || link.pathname !== location.pathname) {
            return;
        }

        link.addEventListener('click', event => handleClick(event, link));
    }

    function handleClick(event: MouseEvent, link: HTMLAnchorElement) {
        // get target element, stop func if there is no target
        const hash = link.hash.slice(1);
        const target = hash ? document.getElementById(hash) : document.body;
        if (!target) {
            return;
        }

        event.preventDefault(); // prevent immediate jump to target
        smoothScroll(target.getBoundingClientRect().top, hash);
    }

    const numOfSteps = 50;
    const stepDuration = 10;

    let isScrolling = false;

    function smoothScroll(distance: number, hash: string) {
        if (isScrolling) {
            return;
        }
        isScrolling = true;

        const currentXPos = window.pageXOffset || document.documentElement.scrollLeft;
        const currentYPos = window.pageYOffset || document.documentElement.scrollTop;

        const stepLength = distance / numOfSteps;

        let i = 1;
        const scrollAStep = () => {
            const targetYPos = currentYPos + i * stepLength;
            window.scrollTo(currentXPos, targetYPos);

            if (++i < numOfSteps) {
                setTimeout(scrollAStep, stepDuration);
            } else {
                isScrolling = false;
                location.hash = hash;
            }
        };

        setTimeout(scrollAStep, stepDuration);
    }
});
