/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */
{
    class Revealer {
        constructor(el, options) {
            this.options = {
                angle: 0
            };
            Object.assign(this.options, options);

            this.DOM = {};
            this.DOM.el = el;
            this.DOM.inner = this.DOM.el.firstElementChild;

            this.DOM.inner.style.width = `calc(100vw * ${Math.abs(Math.cos(this.options.angle * Math.PI/180))} + 100vh * ${Math.abs(Math.sin(this.options.angle * Math.PI/180))})`;
            this.DOM.inner.style.height = `calc(100vw * ${Math.abs(Math.sin(this.options.angle * Math.PI/180))} + 100vh * ${Math.abs(Math.cos(this.options.angle * Math.PI/180))})`;
            this.DOM.el.style.transform = `rotate3d(0,0,1,${this.options.angle}deg)`;

            this.DOM.reverse = this.DOM.inner.querySelector('.content__reverse');
            if ( this.DOM.reverse ) {
                TweenMax.set(this.DOM.reverse, {rotation: -1*this.options.angle});
            }
        }
    }

    // Content elements
    const content = {
        first: document.querySelector('.content--first'),
        second: document.querySelector('.content--second'),
        third: document.querySelector('.content--third'),

    };

    // First page's content.
    const firstPageContent = {
        enter: content.first.querySelector('.intro__enter'),
        about: content.first.querySelector('.intro__about')
    };


    // Second page's content.
    const secondPageContent = {
        reel: content.second.querySelector('.reel'),
        backCtrl: content.second.querySelector('.content__back')
    };

    const thirdPageContent = {
        reel: content.second.querySelector('.reel2'),
        backCtrl: content.second.querySelector('.content__back2')
    };

    // Revealer element
    const revealer = new Revealer(content.first, {angle: 35});

    // Animate things: show revealer animation, animate first page elements out (optional) and animate second page elements in (optional)
    const showNextPage = () => {
        // Pointer events related class
        content.first.classList.add('content--hidden');
        content.third.classList.add('content--hidden');

        const ease = Expo.easeInOut;
        const duration = 1.2;
        this.pageToggleTimeline = new TimelineMax()
        // Animate first page elements (optional)
        .to(firstPageContent.enter, duration*0.5, {
            ease: ease,
            opacity: 0
        }, 0)

        // "Unreveal effect" (inner moves to one direction and reverse moves to the opposite one)
        .to(revealer.DOM.inner, duration, {
            ease: ease,
            y: '-100%'
        }, 0)
        .to(revealer.DOM.reverse, duration, {
            ease: ease,
            y: '100%'
        }, 0)

        // Animate second page elements (optional)
        .to(secondPageContent.reel, duration, {
            ease: ease,
            startAt: {y: 100},
            y: 0
        }, 0);

        content.third.classList.add("hide")

    };

    const showPage2 = () => {
        // Pointer events related class
        content.first.classList.add('content--hidden');
        content.second.classList.add('content--hidden');

        const ease = Expo.easeInOut;
        const duration = 1.2;
        this.pageToggleTimeline = new TimelineMax()
        // Animate first page elements (optional)
        .to(firstPageContent.enter, duration*0.5, {
            ease: ease,
            opacity: 0
        }, 0)

        // "Unreveal effect" (inner moves to one direction and reverse moves to the opposite one)
        .to(revealer.DOM.inner, duration, {
            ease: ease,
            y: '-100%'
        }, 0)
        .to(revealer.DOM.reverse, duration, {
            ease: ease,
            y: '100%'
        }, 0)

        // // Animate second page elements (optional)
        // .to(thirdPageContent.reel, duration, {
        //     ease: ease,
        //     startAt: {y: 100},
        //     y: 0
        // }, 0);
        console.log("Done getting over here")
        content.second.classList.add("hide")
    };
    firstPageContent.enter.addEventListener('click', showNextPage);
    firstPageContent.about.addEventListener('click', showPage2);

    // Animate back
    const showIntro = () => {
        // Pointer events related class
        content.first.classList.remove('content--hidden');
        content.third.classList.remove('content--hidden');
        content.first.classList.remove('hide');
        content.third.classList.remove('hide');
        this.pageToggleTimeline.reverse();
    };
    secondPageContent.backCtrl.addEventListener('click', showIntro);


}
