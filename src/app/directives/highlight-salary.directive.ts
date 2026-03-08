import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlightSalary]',
    standalone: true
})
export class HighlightSalaryDirective implements OnInit {
    @Input('appHighlightSalary') salary: number = 0;
    @Input() threshold: number = 80000;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        if (this.salary >= this.threshold) {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff3e0');
            this.renderer.setStyle(this.el.nativeElement, 'color', '#e65100');
            this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
            this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #ef6c00');
        }
    }
}
