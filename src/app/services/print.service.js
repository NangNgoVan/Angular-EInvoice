function html2pdf(html, pdf, callback) {
    var canvas = pdf.canvas;
    if (!canvas) {
        alert('jsPDF canvas plugin not installed');
        return;
    }
    canvas.pdf = pdf;
    pdf.annotations = {

        _nameMap: [],

        createAnnotation: function (href, bounds) {
            var x = pdf.context2d._wrapX(bounds.left);
            var y = pdf.context2d._wrapY(bounds.top);
            var page = pdf.context2d._page(bounds.top);
            var options;
            var index = href.indexOf('#');
            if (index >= 0) {
                options = {
                    name: href.substring(index + 1)
                };
            } else {
                options = {
                    url: href
                };
            }
            pdf.link(x, y, bounds.right - bounds.left, bounds.bottom - bounds.top, options);
        },

        setName: function (name, bounds) {
            var x = pdf.context2d._wrapX(bounds.left);
            var y = pdf.context2d._wrapY(bounds.top);
            var page = pdf.context2d._page(bounds.top);
            this._nameMap[name] = {
                page: page,
                x: x,
                y: y
            };
        }

    };
    canvas.annotations = pdf.annotations;

    pdf.context2d._pageBreakAt = function (y) {
        this.pageBreaks.push(y);
    };

    pdf.context2d._gotoPage = function (pageOneBased) {
        while (pdf.internal.getNumberOfPages() < pageOneBased) {
            pdf.addPage();
        }
        pdf.setPage(pageOneBased);
    }

    if (typeof html === 'string') {
        // remove all scripts
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

        var iframe = document.createElement('iframe');
        //iframe.style.width = canvas.width;
        //iframe.src = "";
        //iframe.document.domain =
        document.body.appendChild(iframe);
        var doc;
        doc = iframe.contentDocument;
        if (doc == undefined || doc == null) {
            doc = iframe.contentWindow.document;
        }
        //iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');

        doc.open();
        doc.write(html);
        doc.close();

        var promise = html2canvas(doc.body, {
            canvas: canvas,
            onrendered: function (canvas) {
                if (callback) {
                    if (iframe) {
                        iframe.parentElement.removeChild(iframe);
                    }
                    callback(pdf);
                }
            }
        });

    } else {
        var body = html;
        var promise = html2canvas(body, {
            canvas: canvas,
            onrendered: function (canvas) {
                if (callback) {
                    if (iframe) {
                        iframe.parentElement.removeChild(iframe);
                    }
                    callback(pdf);
                }
            }
        });
    }

};

function printService($templateCache, patternsService) {
    var self = this;
    self.printInvoice = function (invoice) {
        var html = $templateCache.get('./goc-03-1.html');

        var doc = new jsPDF({
            orientation: 'portrait', //portrait/landscape
            unit: 'px',
            format: [793.7007874, 1122.519685]
        });
        var specialElementHandlers = {
            '#viewpdf': function (element, renderer) {
                return true;
            }
        };
        doc.addFont('Roboto');
        doc.fromHTML(html, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        }, function (dispose) {
            var data = doc.output('datauristring');
            var link = document.createElement("a");
            link.href = data;
            link.target = "blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });


        





        // var builder = new jsPDF({
        //     orientation: 'portrait', //portrait/landscape
        //     unit: 'px',
        //     format: [793.7007874, 1122.519685]
        // });

        // html2pdf(html, builder, function (builder) {
        //     var data = builder.output('datauristring');
        //     var link = document.createElement("a");
        //     link.href = data;
        //     link.target = "blank";
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        // });
    };

    self.exportPdf = function (blobPdf) {
        // var data = (window.URL || window.wekitURL).createObjectURL(blobPdf)
        // var link = document.createElement("a");
        // link.href = data;
        // link.target = "blank";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        var file = new Blob([blobPdf], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var link = document.createElement("a");
        link.href = fileURL;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    self.saveFile = function (content, fileName) {
        var file = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(file, fileName);
    };
};

angular
    .module('services')
    .service('printService', printService);
printService.$inject = ['$templateCache'];