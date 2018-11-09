'use strict';

const tooltips = document.querySelectorAll('.tooltip');

if (tooltips.length > 0) {
  const showTooltip = function (el) {
    el.style.visibility = 'visible';
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
  };

  const hideTooltip = function (el) {
    el.style.visibility = 'hidden';
    el.style.transform = 'scale(0)';
    el.style.opacity = '0';
  };

  tooltips.forEach( (el) => {
    el.style.position = 'relative';

    const tooltipWrap = document.createElement('div'), 
          tooltipEl = document.createElement('p'),
          arrowLeft = document.createElement('div');
    tooltipWrap.style.visibility = 'hidden';
    tooltipWrap.style.transform = 'scale(0)';
    tooltipWrap.style.opacity = '0';
    tooltipWrap.style.transition = 'all .3s ease-in-out';
    tooltipWrap.style.position = 'absolute';
    tooltipWrap.style.top = `16px`;
    tooltipWrap.style.left = `86px`;
    tooltipWrap.style.borderRadius = '200px';
    tooltipWrap.style.backgroundColor = '#363636';
    tooltipWrap.style.pointerEvents = 'none';
    tooltipEl.style.color = '#fff';
    tooltipEl.style.lineHeight = '1em';
    tooltipEl.style.fontSize = '12px';
    tooltipEl.style.fontWeight = 'bold';
    tooltipEl.style.padding = '10px 20px';
    tooltipEl.style.whiteSpace = 'nowrap';
    tooltipEl.innerHTML = el.getAttribute('data-tooltip-text');
    arrowLeft.style.width = 0;
    arrowLeft.style.height = 0;
    arrowLeft.style.borderTop = '5px solid transparent';
    arrowLeft.style.borderBottom = '5px solid transparent';
    arrowLeft.style.borderRight = '8px solid #363636';
    arrowLeft.style.position = 'absolute';
    arrowLeft.style.top = '11px';
    arrowLeft.style.left = '-6px';

    tooltipWrap.appendChild(tooltipEl);
    tooltipWrap.appendChild(arrowLeft);
    el.appendChild(tooltipWrap);

    el.addEventListener('mouseenter', function () {
      showTooltip(tooltipWrap);
    });

    el.addEventListener('mouseleave', function () {
      hideTooltip(tooltipWrap);
    });
  });
}