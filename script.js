(function () {

    var options = {
        minScale: 0.5,
        maxScale: 3
    };

    /**
     * Store the input data and provide some function on it
     */
    var input = {
        isPinching: true, // are we pinching right now?
        startDistance: 0, // fingers started at that distance
        x1: 0, // finger 1 X
        y1: 0, // finger 1 Y
        x2: 0, // finger 2 X
        y2: 0, // finger 2 Y
        startScale: 1.0, // initial scale
        currentScale: 1.0, // current scale,
        scrollTop: 0,
        scrollLeft: 0,

        /**
         * store the finger positions from the given event
         *
         * @param event
         */
        storeFingerPosition: function (event) {
            this.x1 = event.touches[0].clientX;
            this.y1 = event.touches[0].clientY;
            this.x2 = event.touches[1].clientX;
            this.y2 = event.touches[1].clientY;
        },

        /**
         * Calculate the distance between the fingers
         *
         * @returns {number}
         */
        calcFingerDistance: function () {
            var dx = this.x2 - this.x1;
            var dy = this.y2 - this.y1;
            return Math.sqrt(dx * dx + dy * dy);
        },

        /**
         * reset the input variable to be ready for the next event
         */
        reset: function () {
            this.startScale = this.currentScale;
            this.startDistance = 0;
            this.x1 = 0;
            this.y1 = 0;
            this.x2 = 0;
            this.y2 = 0;
            this.isPinching = false;
        }
    };


    /**
     * Begin the pinch handling
     *
     * @param event
     */
    function onTouchStart(event) {
        if (event.touches.length !== 2) return;
        event.preventDefault();
        event.stopPropagation();

        console.log(attach.offsetWidth, attach.offsetHeight, attach.offsetLeft, attach.offsetTop);
        console.log(attach.getBoundingClientRect());


        input.storeFingerPosition(event);
        input.startDistance = input.calcFingerDistance();
        input.isPinching = true;
        input.scrollTop = attach.parentNode.scrollTop;
        input.scrollLeft = attach.parentNode.scrollLeft;
    }

    /**
     * During pinch handling
     *
     * @param event
     */
    function onTouchMove(event) {
        if (event.touches.length !== 2) return;
        event.preventDefault();
        event.stopPropagation();

        input.storeFingerPosition(event);
    }

    /**
     * finish pinch handling
     *
     * @param event
     */
    function onTouchEnd(event) {
        if (!input.isPinching) return;
        event.preventDefault();
        event.stopPropagation();
        input.reset();


        console.log(attach.offsetWidth, attach.offsetHeight, attach.offsetLeft, attach.offsetTop);
        console.log(attach.getBoundingClientRect());
    }

    /**
     * Execute rendering during animation frame
     */
    function onAnimationFrame() {
        requestAnimationFrame(onAnimationFrame);
        render();
    }

    /**
     * Calculates and applies the new scale
     */
    function render() {
        if (!input.isPinching) return;
        var newDistance = input.calcFingerDistance();

        /*
         * Calculate the scaling from the distance the fingers made since the
         * beginning of the pinch
         *
         * @todo the pixel-to-scalechange ratio should be calculated from the device's display density
         */
        var scalePixelChange = newDistance - input.startDistance;
        input.currentScale = input.startScale + scalePixelChange * 0.01;
        if (input.currentScale < options.minScale) input.currentScale = minScale;
        if (input.currentScale > options.maxScale) input.currentScale = maxScale;

        //FIXME prefix if needed

        /*
         * OffsetWidth and height are not scaled and stay in the original size.
         * Scaling happens from center of the element. Here we calculate how much of it
         * scaled out of the original boundary
         */
        var transX = ((attach.offsetWidth * input.currentScale) / 2) - (attach.offsetWidth / 2);
        var transY = ((attach.offsetHeight * input.currentScale) / 2) - (attach.offsetHeight / 2);
        /*
         * translates are influenced by the scaling, so we remove that from the
         * calculated value
         */
        transX = transX/input.currentScale;
        transY = transY/input.currentScale;

        /*
         * Apply scaling and translate (this basically moves the origin to 0,0), then
         * the outer container is scrolled to make up for the translation
         */
        attach.style.transform = 'scale(' + input.currentScale + ') translate(' + transX + 'px, ' + transY + 'px)';
        attach.parentNode.scrollTop = input.scrollTop + transY;
        attach.parentNode.scrollLeft = input.scrollLeft + transX;
    }

    /*
     * Main
     */
    var attach = document.getElementById('content');
    attach.addEventListener('touchstart', onTouchStart);
    attach.addEventListener('touchmove', onTouchMove);
    attach.addEventListener('touchend', onTouchEnd);
    requestAnimationFrame(onAnimationFrame);


})();