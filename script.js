document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    // 엔터 키로 생성
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    // 삼행시 생성 버튼 클릭
    generateBtn.addEventListener('click', async () => {
        const word = wordInput.value.trim();

        // 입력 검증
        if (!word) {
            showError('단어를 입력해주세요!');
            return;
        }

        if (word.length !== 3) {
            showError('정확히 3글자를 입력해주세요!');
            return;
        }

        // UI 상태 업데이트
        hideError();
        hideResult();
        showLoading();
        generateBtn.disabled = true;

        try {
            // API 호출
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '삼행시 생성에 실패했습니다.');
            }

            const data = await response.json();

            // 결과 표시
            hideLoading();
            showResult(data.poem);

        } catch (error) {
            console.error('Error:', error);
            hideLoading();
            showError(error.message || '삼행시 생성 중 오류가 발생했습니다.');
        } finally {
            generateBtn.disabled = false;
        }
    });

    // UI 헬퍼 함수들
    function showLoading() {
        loadingDiv.classList.remove('hidden');
    }

    function hideLoading() {
        loadingDiv.classList.add('hidden');
    }

    function showResult(poem) {
        resultContent.textContent = poem;
        resultDiv.classList.remove('hidden');
    }

    function hideResult() {
        resultDiv.classList.add('hidden');
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    function hideError() {
        errorDiv.classList.add('hidden');
    }
});
