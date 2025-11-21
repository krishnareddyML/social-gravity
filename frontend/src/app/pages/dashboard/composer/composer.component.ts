import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-composer',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './composer.component.html',
    styleUrl: './composer.component.css'
})
export class ComposerComponent {
    content = '';
    selectedPlatforms: string[] = [];
    scheduledTime: string = '';
    mediaFiles: any[] = [];
    userId = 1; // Mock user ID

    constructor(private postService: PostService, private router: Router) { }

    togglePlatform(platform: string) {
        if (this.selectedPlatforms.includes(platform)) {
            this.selectedPlatforms = this.selectedPlatforms.filter(p => p !== platform);
        } else {
            this.selectedPlatforms.push(platform);
        }
    }

    onFileSelected(event: any) {
        const files = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.mediaFiles.push({
                        file: file,
                        preview: e.target.result
                    });
                };
                reader.readAsDataURL(file);
            }
        }
    }

    removeMedia(index: number) {
        this.mediaFiles.splice(index, 1);
    }

    onSubmit() {
        if (this.selectedPlatforms.length === 0) {
            alert('Please select at least one platform');
            return;
        }
        if (!this.content && this.mediaFiles.length === 0) {
            alert('Please add some content or media');
            return;
        }

        const post = {
            content: this.content,
            platforms: this.selectedPlatforms,
            scheduledTime: this.scheduledTime ? new Date(this.scheduledTime) : null,
            mediaUrls: this.mediaFiles.map(m => 'mock_url_for_' + m.file.name) // Mock media upload
        };

        this.postService.createPost(this.userId, post).subscribe({
            next: (response) => {
                console.log('Post created', response);
                alert('Post created successfully!');
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error('Failed to create post', err);
                alert('Failed to create post');
            }
        });
    }
}
